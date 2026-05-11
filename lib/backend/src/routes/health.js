export function healthRoute(_req, res) {
  res.json({ status: 'ok', service: 'backend' });
}
