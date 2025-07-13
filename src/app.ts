import path from 'node:path';

import cors from 'cors';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import helmet from 'helmet';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressEjsLayouts);

app.use(express.json());
app.use(cors());
app.use(helmet());

export default app;
