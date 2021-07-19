import express, { Request, Response } from 'express';
import helmet from 'helmet';

const app = express();
const port = 8080; // default port to listen

app.use(helmet());
app.get('/', (req: Request, res: Response) => {
  return res.send('hello');
});
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
