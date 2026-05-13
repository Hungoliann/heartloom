import { addWaitlistEntry } from "../shared/waitlist-store.js";

function setJson(res, statusCode, body) {
  res.status(statusCode).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return setJson(res, 405, { message: "Method not allowed." });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const result = await addWaitlistEntry(payload);

    return setJson(res, result.created ? 201 : 200, {
      message: result.created ? "You were added to the waitlist." : "You are already on the waitlist.",
      created: result.created,
      entry: result.entry,
      total: result.total,
    });
  } catch (error) {
    const statusCode = error?.statusCode || 500;
    const message = statusCode === 500 ? "Unable to save waitlist submission." : error.message;

    return setJson(res, statusCode, {
      message,
      code: error?.code || "WAITLIST_ERROR",
    });
  }
}
