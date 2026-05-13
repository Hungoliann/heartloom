export function indexRoute(_req, res) {
  res.json({
    message: 'Heartloom API is running',
    endpoints: ['/api/health', '/api/waitlist'],
  });
}
