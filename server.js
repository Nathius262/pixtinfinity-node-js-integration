import express from 'express';
import rootRouter from './routers/root.js';
import blogRouter from './routers/blog.js';
import tagRouter from './routers/tag.js';
import { fileURLToPath } from 'url';
import path from 'path';
import handlebars from 'express-handlebars';
import {internalServerError, pageNotFound} from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser';
import removeTrailingSlash from './middlewares/normalizer.js'



const PORT = process.env.PORT || 3000;

// Derive the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set Handlebars as the template engine with .html extension

// Register handlebars helpers

const hbs = handlebars.create({
  extname: '.html',
  defaultLayout: 'main', // Default layout
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    truncate: (text, wordCount) => {
      if (typeof text !== 'string') return '';
      const words = text.split(' ');
      return words.slice(0, wordCount).join(' ') + (words.length > wordCount ? '...' : '');
    }, 
    stripTags: (html) => {
      if (typeof html !== 'string') return '';
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    },
    truncateText: (text, wordCount) => {
      if (typeof text !== 'string') return '';
      const strippedText = text.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
      const words = strippedText.split(' ');
      return words.slice(0, wordCount).join(' ') + (words.length > wordCount ? '...' : '');
    },
    randomClass: function(index) {
      const classes = ['scroll-x-top-el', 'scroll-x-down-el', 'scroll-y-down-el', 'scroll-y-top-el'];
      return classes[index % classes.length];
    }
  }
});

// Set Handlebars as the template engine with .html extension
const app = express();
app.use(removeTrailingSlash );
app.use(cookieParser());

app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/blog/', express.static(path.join(__dirname, 'public')));
app.use('/tag/', express.static(path.join(__dirname, 'public')));


// routes
app.use('/', rootRouter);
app.use('/blog/', blogRouter);
app.use('/tag/', tagRouter);

//middlewares
app.use(pageNotFound);
app.use(internalServerError);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
