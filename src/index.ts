import express, { Request, Response } from 'express';
import helmet from 'helmet';
import path = require('path');

const app = express();
const port = 8080; // default port to listen

app.use(helmet());
app.use(
  express.static(path.join(__dirname, '../public'), {
    etag: true,
    maxAge: '20s',
  })
);
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
