import { NextResponse } from "next/server";
import { contactErrorResponse, sendContactEmail } from "../../../../../../shared/contact-mailer.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload.", code: "INVALID_JSON" }, { status: 400 });
  }

  try {
    const result = await sendContactEmail(payload);

    return NextResponse.json({
      message: result.message,
    });
  } catch (error) {
    const response = contactErrorResponse(error);

    return NextResponse.json(response.body, { status: response.statusCode });
  }
}
