import express from 'express';
import cors from 'cors';
import { healthRoute } from './routes/health.js';
import { indexRoute } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', healthRoute);
app.get('/api', indexRoute);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
