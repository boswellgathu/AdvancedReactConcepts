import express from 'express';

import serverRender from 'renderers/server';
import config from '../config';
import { data } from './test-data';


const app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const initialContent = await serverRender();
  res.render('index', { ...initialContent });
});

app.get('/data', (req, res) => {
  res.send(data);
});

app.listen(config.port, function listenHandler(){
  console.info(`Running on Port ${config.port}`);
});

