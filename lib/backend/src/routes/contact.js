import { contactErrorResponse, sendContactEmail } from '../../../../shared/contact-mailer.js';

function sendJson(res, statusCode, body) {
  return res.status(statusCode).json(body);
}

export async function contactRoute(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { message: 'Method not allowed.' });
  }

  try {
    const result = await sendContactEmail(req.body);

    return sendJson(res, 200, {
      message: result.message,
    });
  } catch (error) {
    const response = contactErrorResponse(error);

    return sendJson(res, response.statusCode, response.body);
  }
}
