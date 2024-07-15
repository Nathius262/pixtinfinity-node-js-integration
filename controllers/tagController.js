import fetch from 'node-fetch';

const BLOG_API_URL = 'https://pixtinfinity.pythonanywhere.com/api';

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
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };

export default getTagPostsPage