import express from 'express';
import { engine } from 'express-handlebars';
import fetch from 'node-fetch';
import rootRouter from './routers/root.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Derive the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set Handlebars as the template engine with .html extension

app.engine('html', engine({ extname: '.html' }));
app.set('view engine', 'html');

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
// routes
app.use('/', rootRouter);
//app.use('blog/', require('./routers/blog'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
