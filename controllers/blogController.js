import fetch from 'node-fetch';

const BLOG_API_URL = 'https://pixtinfinity.pythonanywhere.com/api';

const TAG_API_URL = `${BLOG_API_URL}/tag`

const renderBlogPosts = async (req, res, viewTemplate) => {
    const page = req.query.page || 1; // Get the page number from the query parameters, default to 1 if not provided
    try {

      const [postsResponse, tagsResponse] = await Promise.all([
        fetch(`${BLOG_API_URL}/post?page=${page}`),
        fetch(`${TAG_API_URL}`)
      ]);
  
      const postsData = await postsResponse.json();
      const tagsData = await tagsResponse.json();
  
      const tags = tagsData.results;

      const blogs = postsData.results;
      const firstFourBlogs = blogs.slice(0, 4);
      const remainingBlogs = blogs.slice(4);
      const next = postsData.next;
      const previous = postsData.previous;
      res.render(viewTemplate, { tags, blogs, firstFourBlogs, remainingBlogs, next, previous, currentPage: page });
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };
export const renderIndex = (req, res) => renderBlogPosts(req, res, 'index');
export const renderBlog = (req, res) => renderBlogPosts(req, res, 'blog');
