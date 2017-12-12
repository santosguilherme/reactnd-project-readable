import request from '../http/request';


const API_URL_BASE = `/comments`;

export default {
    fromPost: postId => request.query(`/posts/${postId}/comments`)
};
