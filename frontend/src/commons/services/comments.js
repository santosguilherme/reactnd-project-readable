import request from '../http/request';


const API_URL_BASE = `/comments`;

export default {
    fromPost: postId => request.query(`/posts/${postId}/comments`),
    voteUp: commentId => request.save(`${API_URL_BASE}/${commentId}`, {option: 'upVote'}),
    voteDown: commentId => request.save(`${API_URL_BASE}/${commentId}`, {option: 'downVote'}),
    remove: commentId => request.remove(`${API_URL_BASE}/${commentId}`),
    newComment: comment => request.save(API_URL_BASE, comment),
    updateComment: comment => request.update(`${API_URL_BASE}/${comment.id}`, comment)
};
