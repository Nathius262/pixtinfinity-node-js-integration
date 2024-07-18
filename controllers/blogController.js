import fetch from 'node-fetch';
import dotenv from 'dotenv'

// Load the environment variables
dotenv.config();

// Access the environment variable
const BLOG_API_URL = "https://pixtinfinity.pythonanywhere.com/api";

const TAG_API_URL = `${BLOG_API_URL}/tag`

/// get post for blog page
const getBlogPostsPage = async (req, res) => {
    const page = req.query.page || 1; // Get the page number from the query parameters, default to 1 if not provided
    try {

      const [postsResponse, trendPostResponse, tagsResponse] = await Promise.all([
        fetch(`${BLOG_API_URL}/post?page=${page}`),
        fetch(`${BLOG_API_URL}/trends/`),
        fetch(`${TAG_API_URL}`)
      ]);
  
      const postsData = await postsResponse.json();
      const trendPostData = await trendPostResponse.json();
      const tagsData = await tagsResponse.json();
  
      const tags = tagsData.results;
  
      const trendResult = trendPostData.results.slice(0, 4);
      const blogs = postsData.results;
      const next = postsData.next;
      const previous = postsData.previous;

      res.render('blog', { tags, blogs, trendResult, next, previous, currentPage: page });
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };


/// get post for index page
const getBlogPosts = async (req, res) => {
  const page = req.query.page || 1; // Get the page number from the query parameters, default to 1 if not provided
  try {

    const [postsResponse, trendPostResponse, tagsResponse] = await Promise.all([
      fetch(`${BLOG_API_URL}/post?page=${page}`),
      fetch(`${BLOG_API_URL}/trends/`),
      fetch(`${TAG_API_URL}`)
    ]);
    const postsData = await postsResponse.json();
    const trendPostData = await trendPostResponse.json();
    const tagsData = await tagsResponse.json();

    const tags = tagsData.results;

    const trendResult = trendPostData.results.slice(0, 4);

    const blogs = postsData.results;
    const postHighlights = blogs.slice(0, 6);

    res.render('index', { tags, trendResult, postHighlights});
  } catch (error) {
    res.status(500).render('500', { message: 'Internal Server Error', error:error});
  }
};

/// get post for detailed page
const singleBlogPost = async (req, res) => {
  const blogId = req.params.slug;
  const userAgent = req.headers['user-agent']; // Extract the User-Agent from the incoming request
  const sessionId = req.cookies.sessionId || '';
  try {

      const [postsResponse, tagsResponse] = await Promise.all([
        fetch(`${BLOG_API_URL}/post/${blogId}`, {
          headers: {
            'User-Agent': userAgent, // Forward the User-Agent header
            'Cookie': sessionId ? `sessionid=${sessionId}` : '',
          }
        }),
        fetch(`${TAG_API_URL}`)
      ]);

  
      const postsData = await postsResponse.json();
      const tagsData = await tagsResponse.json();

      if (postsData.detail){
        res.status(404).render('404', { url: `${req.protocol}://${req.get('host')}${req.originalUrl}` });
      }
  
      const tags = tagsData.results;
      const singlePost = postsData;
      const endpoint = "https://pixtinfinity.pythonanywhere.com/api"

      // Store session ID in a cookie
      res.cookie('sessionId', singlePost.session_id, { httpOnly: true });

      res.render('blog_detail', { tags, singlePost, endpoint});
    } catch (error) {
      res.status(500).render('500', { message: 'Internal Server Error', error:error});
    }
}

export {getBlogPosts, getBlogPostsPage, singleBlogPost}
