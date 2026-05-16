export default function handler(_req, res) {
  res.status(200).json({
    message: 'Heartloom API is running',
    endpoints: ['/api/health', '/api/healthz', '/api/waitlist', '/api/contact'],
  });
}
