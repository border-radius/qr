import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 5000;

const ids: string[] = [];
const MAX_TIMEOUT = 10000;
const REDIRECT = 'https://ak.psaltauw.net/4/5967693';

express()
  .use(express.static(path.join(__dirname, '../public')))
  .get('/c/:id', (req, res, next) => {
    ids.push(req.params.id);
    const qs = Object.keys(req.query).map(key => [key, req.query[key]].join('=')).join('&');
    res.redirect(`${REDIRECT}?${qs}`);
  })
  .get('/w/:id', (req, res, next) => {
    let sent = false;

    const i = setInterval(() => {
      if (ids.indexOf(req.params.id) > -1 && !sent) {
        sent = true;
        clearInterval(i);
        res.send('OK');
      }
    }, 300);

    setTimeout(() => {
      if (!sent) {
        sent = true;
        clearInterval(i);
        res.send('TIMEOUT');
      }
    }, MAX_TIMEOUT);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
