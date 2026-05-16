import { contactErrorResponse, sendContactEmail } from "../shared/contact-mailer.js";

function setJson(res, statusCode, body) {
  res.status(statusCode).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return setJson(res, 405, { message: "Method not allowed." });
  }

  let payload;

  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return setJson(res, 400, { message: "Invalid JSON payload.", code: "INVALID_JSON" });
  }

  try {
    const result = await sendContactEmail(payload);

    return setJson(res, 200, {
      message: result.message,
    });
  } catch (error) {
    const response = contactErrorResponse(error);

    return setJson(res, response.statusCode, response.body);
  }
}
