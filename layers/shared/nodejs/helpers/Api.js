const Axios = require('axios');

async function fetchPosts(username) {
    if(!username) return null;

    let posts = await Axios.get(`https://dev.to/api/articles/latest?username=${username}`);

    return posts.data;
}

module.exports = {
    fetchPosts
}