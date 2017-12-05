import request from '../http/request';


const API_URL_BASE = `/posts`;

export default {
    byCategory: category => request.query(`${category}/${API_URL_BASE}`),
    allPosts: () => request.query(API_URL_BASE),
    newPost: post => request.save(API_URL_BASE, post),
    byId: postId => request.get(`${API_URL_BASE}/${postId}`)
};
