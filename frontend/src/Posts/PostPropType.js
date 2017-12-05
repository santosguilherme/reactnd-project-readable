import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    commentCount: PropTypes.number
});