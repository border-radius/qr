import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 5000;
const server = express();

const ids: string[] = [];

express()
  .use(express.static(path.join(__dirname, '../public')))
  .get('/c/:id', (req, res, next) => {
    ids.push(req.params.id);
    res.redirect('/c.html');
  })
  .get('/w/:id', (req, res, next) => {
    const i = setInterval(() => {
      if (ids.indexOf(req.params.id) > -1) {
        clearInterval(i);
        res.send('OK');
      }
    }, 300);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
