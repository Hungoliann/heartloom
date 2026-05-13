export default function handler(_req, res) {
  res.status(200).json({
    message: 'Heartloom API is running',
    endpoints: ['/api/healthz', '/api/waitlist'],
  });
}
