import fetch from 'node-fetch';

const BLOG_API_URL = 'https://pixtinfinity.pythonanywhere.com/api';

const TAG_API_URL = `${BLOG_API_URL}/tag`

/// get post for blog page
const getBlogPostsPage = async (req, res) => {
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
      const firstFourBlogs = blogs.slice(0, 6);
      const next = postsData.next;
      const previous = postsData.previous;
      res.render('blog', { tags, blogs, firstFourBlogs, next, previous, currentPage: page });
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };


/// get post for index page
const getBlogPosts = async (req, res) => {
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
    res.render('index', { tags, firstFourBlogs, remainingBlogs, next, previous, currentPage: page });
  } catch (error) {
    res.status(500).render('500', { message: 'Internal Server Error', error:error});
  }
};

/// get post for detailed page
const singleBlogPost = async (req, res) => {
  const blogId = req.params.slug;
  try {

      const [postsResponse, tagsResponse] = await Promise.all([
        fetch(`${BLOG_API_URL}/post/${blogId}`),
        fetch(`${TAG_API_URL}`)
      ]);

  
      const postsData = await postsResponse.json();
      const tagsData = await tagsResponse.json();

      if (postsData.detail){
        res.status(404).render('404', { url: `${req.protocol}://${req.get('host')}${req.originalUrl}` });
      }
  
      const tags = tagsData.results;

      const singlePost = postsData;
      res.render('blog_detail', { tags, singlePost});
    } catch (error) {
      res.status(500).render('500', { message: 'Internal Server Error', error:error});
    }
}

export {getBlogPosts, getBlogPostsPage, singleBlogPost}
