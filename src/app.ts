import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Dev Forum is successfully running');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});