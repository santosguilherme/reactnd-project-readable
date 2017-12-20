import request from '../http/request';


const API_URL_BASE = `/posts`;

export default {
    byCategory: category => request.query(`/${category}${API_URL_BASE}`),
    allPosts: () => request.query(API_URL_BASE),
    newPost: post => request.save(API_URL_BASE, post),
    updatePost: post => request.update(`${API_URL_BASE}/${post.id}`, post),
    byId: postId => request.get(`${API_URL_BASE}/${postId}`),
    voteUp: postId => request.save(`${API_URL_BASE}/${postId}`, {option: 'upVote'}),
    voteDown: postId => request.save(`${API_URL_BASE}/${postId}`, {option: 'downVote'}),
    remove: postId => request.remove(`${API_URL_BASE}/${postId}`)
};