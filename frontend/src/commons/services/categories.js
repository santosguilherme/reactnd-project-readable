import request from '../http/request';


const API_URL_BASE = `/categories`;

export default {
    query: () => request.query(`${API_URL_BASE}`)
};
