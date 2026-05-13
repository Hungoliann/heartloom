import { addWaitlistEntry } from '../../../../shared/waitlist-store.js';

function sendJson(res, statusCode, body) {
  return res.status(statusCode).json(body);
}

export async function waitlistRoute(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { message: 'Method not allowed.' });
  }

  try {
    const result = await addWaitlistEntry(req.body);

    return sendJson(res, result.created ? 201 : 200, {
      message: result.created ? 'You were added to the waitlist.' : 'You are already on the waitlist.',
      created: result.created,
      entry: result.entry,
      total: result.total,
    });
  } catch (error) {
    const statusCode = error?.statusCode || 500;
    const message = statusCode === 500 ? 'Unable to save waitlist submission.' : error.message;

    return sendJson(res, statusCode, {
      message,
      code: error?.code || 'WAITLIST_ERROR',
    });
  }
}
