import express from 'express';
import { engine } from 'express-handlebars';
import rootRouter from './routers/root.js';
import blogRouter from './routers/blog.js';
import tagRouter from './routers/tag.js';
import { fileURLToPath } from 'url';
import path from 'path';
import handlebars from 'express-handlebars';

const PORT = process.env.PORT || 3000;

// Derive the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set Handlebars as the template engine with .html extension

// Register handlebars helpers

const hbs = handlebars.create({
  extname: '.html',
  helpers: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    truncate: (text, wordCount) => {
      if (typeof text !== 'string') return '';
      const words = text.split(' ');
      return words.slice(0, wordCount).join(' ') + (words.length > wordCount ? '...' : '');
    }
  }
});

// Set Handlebars as the template engine with .html extension
const app = express();
app.engine('html', hbs.engine);
app.set('view engine', 'html');


// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/blog/', express.static(path.join(__dirname, 'public')));
app.use('/tag/', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', rootRouter);
app.use('/blog/', blogRouter);
app.use('/tag/', tagRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
