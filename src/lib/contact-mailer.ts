const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "heartloomllc@gmail.com";
const DEFAULT_FROM_EMAIL = "Heartloom <onboarding@resend.dev>";

const allowedContactMethods = new Set(["Email", "Phone"]);
const allowedTimings = new Set(["Immediate", "Planning for Future", "Gift for Another"]);

export interface ContactSubmission {
  name: string;
  familyName: string;
  email: string;
  contactMethod: string;
  timing: string;
  intent: string;
}

export interface ContactEmail {
  subject: string;
  text: string;
  html: string;
}

export interface ContactErrorResponse {
  statusCode: number;
  body: { message: string; code: string };
}

class ContactError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 400, code = "CONTACT_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

function createContactError(message: string, statusCode = 400, code = "CONTACT_ERROR"): ContactError {
  return new ContactError(message, statusCode, code);
}

function normalizeText(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function normalizeSingleLine(value: unknown, maxLength: number): string {
  return normalizeText(value, maxLength).replace(/\s+/g, " ");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactSubmission(input: unknown): ContactSubmission {
  const raw = input as Record<string, unknown>;
  const name = normalizeSingleLine(raw?.name, 120);
  const familyName = normalizeSingleLine(raw?.familyName, 160);
  const email = normalizeSingleLine(raw?.email, 254).toLowerCase();
  const contactMethodInput = normalizeSingleLine(raw?.contactMethod, 40);
  const timingInput = normalizeSingleLine(raw?.timing, 80);
  const intent = normalizeText(raw?.intent, 4000);

  if (!name || !email || !intent) {
    throw createContactError("Please include your name, email, and a short message.", 400, "MISSING_FIELDS");
  }

  if (!isValidEmail(email)) {
    throw createContactError("Please enter a valid email address.", 400, "INVALID_EMAIL");
  }

  return {
    name,
    familyName,
    email,
    contactMethod: allowedContactMethods.has(contactMethodInput) ? contactMethodInput : "Email",
    timing: allowedTimings.has(timingInput) ? timingInput : "Immediate",
    intent,
  };
}

export function buildContactEmail(submission: ContactSubmission): ContactEmail {
  const subject = `Heartloom contact request from ${submission.name}`;
  const text = [
    `Name: ${submission.name}`,
    `Family / Legacy Title: ${submission.familyName || "N/A"}`,
    `Email: ${submission.email}`,
    `Preferred Method: ${submission.contactMethod}`,
    `Timing of Need: ${submission.timing}`,
    "",
    "Message:",
    submission.intent,
  ].join("\n");

  const rows: [string, string][] = [
    ["Name", submission.name],
    ["Family / Legacy Title", submission.familyName || "N/A"],
    ["Email", submission.email],
    ["Preferred Method", submission.contactMethod],
    ["Timing of Need", submission.timing],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #eee;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#2b241d;line-height:1.55;">
      <h2 style="margin:0 0 16px;">New Heartloom contact request</h2>
      <table style="border-collapse:collapse;margin-bottom:20px;">${htmlRows}</table>
      <p style="font-weight:600;margin:0 0 8px;">Message</p>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(submission.intent)}</p>
    </div>`;

  return { subject, text, html };
}

export interface SendContactEmailOptions {
  apiKey?: string;
  toEmail?: string;
  fromEmail?: string;
}

export async function sendContactEmail(
  input: unknown,
  options: SendContactEmailOptions = {},
): Promise<{ id: string | null; message: string }> {
  const submission = validateContactSubmission(input);
  const apiKey = options.apiKey ?? process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw createContactError("Email delivery is not configured yet.", 503, "EMAIL_NOT_CONFIGURED");
  }

  const toEmail = options.toEmail ?? process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL;
  const fromEmail = options.fromEmail ?? process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const email = buildContactEmail(submission);

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: email.subject,
      text: email.text,
      html: email.html,
      reply_to: submission.email,
    }),
  });

  const responseBody = await response
    .json()
    .catch(async () => ({ message: await response.text().catch(() => "") }));

  if (!response.ok) {
    const providerMessage =
      typeof responseBody?.message === "string" && responseBody.message.trim()
        ? responseBody.message
        : "The email provider rejected the request.";

    throw createContactError(providerMessage, 502, "EMAIL_PROVIDER_ERROR");
  }

  return {
    id: responseBody?.id ?? null,
    message: "Your request was sent. We will be in touch soon.",
  };
}

export function contactErrorResponse(error: unknown): ContactErrorResponse {
  const err = error as Partial<ContactError>;
  const statusCode = err?.statusCode || 500;
  const isExpected =
    statusCode < 500 || err?.code === "EMAIL_NOT_CONFIGURED" || err?.code === "EMAIL_PROVIDER_ERROR";

  return {
    statusCode,
    body: {
      message: isExpected ? (err.message ?? "Error") : "Unable to send contact request.",
      code: err?.code || "CONTACT_ERROR",
    },
  };
}
