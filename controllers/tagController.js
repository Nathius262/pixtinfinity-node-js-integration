import fetch from 'node-fetch';
import dotenv from 'dotenv'

// Load the environment variables
dotenv.config();

// Access the environment variable
const BLOG_API_URL = process.env.BLOG_API_URL;

const TAG_API_URL = `${BLOG_API_URL}/tag`



/// get post for blog page
const getTagPostsPage = async (req, res) => {
    const page = req.query.page || 1; // Get the page number from the query parameters, default to 1 if not provided
    const tag_id = req.params.id;
    try {

      const [postsResponse, tagsResponse] = await Promise.all([
        fetch(`${TAG_API_URL}/${tag_id}?page=${page}`),
        fetch(`${TAG_API_URL}`)
      ]);
  
      const postsData = await postsResponse.json();
      const tagsData = await tagsResponse.json();
  
      const tags = tagsData.results;

      const posts = postsData.results;
      const next = postsData.next;
      const previous = postsData.previous;
      res.render('category', { tags, posts, next, previous, currentPage: page });
    } catch (error) {
      res.status(500).render('500', { message: 'Internal Server Error', error:error});
    }
  };

export default getTagPostsPage