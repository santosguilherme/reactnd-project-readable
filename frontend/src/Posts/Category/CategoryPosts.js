import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';

import {Grid, Row, Col} from 'react-flexbox-grid';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';


import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';
import {actions as categoriesActions, selectors as categoriesSelectors} from '../../redux/modules/categories';
import {actions as filterActions, selectors as filterSelectors} from '../../redux/modules/postsFilter';

import AppBar from '../../App/AppBar'
import PostPropType from '../PostPropType';


import '../All/allPosts.css';
import PostModal from '../components/PostModal';
import PostListItem from '../components/PostListItem';
import CategoryFilter from '../Category/CategoryFilter';
import OrderByFilter from '../Category/OrderByFilter';


const styles = theme => ({
    addButton: {
        position: 'fixed',
        bottom: '10px',
        right: '10px'
    },
    filterContent: {
        textAlign: 'center',
        padding: '15px 0 10px'
    },
    filterButton: {
        width: '100%'
    },
    card: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        textAlign: 'left'
    },
    cardContent: {
        paddingTop: '0',
        paddingBottom: '0'
    }
});

class CategoryPosts extends Component {
    state = {
        postModalOpen: false,
        selectedPost: undefined
    };

    componentDidMount() {
        const {getCategoryPosts, getAllCategories, updatePostsFilter, match, category} = this.props;
        const categoryParam = match.params.category;

        getAllCategories();

        if (!category || category !== categoryParam) {
            updatePostsFilter({category: categoryParam});
        }

        getCategoryPosts(categoryParam);

        this.unlisten = this.props.history.listen(location => {
            getCategoryPosts(location.state);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleOpenPost = post => {
        const {history} = this.props;
        const {id, category} = post;

        history.push(`${category}/posts/${id}`, {from: history.location.pathname});
    };

    handleSaveNewPost(post) {
        const {saveNewPost} = this.props;

        this.setState({postModalOpen: false});
        saveNewPost(post);
    }

    handleUpdatePost(post) {
        const {updatePost} = this.props;

        this.setState({postModalOpen: false, selectedPost: undefined});
        updatePost(post);
    }

    handleSavePostModal = post => {
        const {selectedPost} = this.state;

        if (!selectedPost) {
            this.handleSaveNewPost(post);
            return;
        }

        this.handleUpdatePost(post);
    };

    handleCancelPostModal = () => {
        this.setState({postModalOpen: false});
    };

    handleNewPost = () => {
        this.setState({postModalOpen: true});
    };

    handleVoteUp = post => {
        const {voteUp} = this.props;
        voteUp(post);
    };

    handleVoteDown = post => {
        const {voteDown} = this.props;
        voteDown(post);
    };

    handleEditPost = post => {
        this.setState({postModalOpen: true, selectedPost: post});
    };

    handleRemovePost = post => {
        const {deletePost} = this.props;
        deletePost(post);
    };

    handleChangeOrderByFilter = orderBy => {
        const {updatePostsFilter} = this.props;
        updatePostsFilter({orderBy});
    };

    handleChangeCategoryFilter = category => {
        const {updatePostsFilter, history} = this.props;

        updatePostsFilter({category});
        history.push(category, category);
    };

    render() {
        const {postModalOpen, selectedPost} = this.state;
        const {classes, posts, categories, orderBy, category} = this.props;
        const colProps = {xs: 12, sm: 8, md: 6, lg: 4};

        return (
            <div>
                <AppBar title={`${category} posts`}/>
                <Grid fluid>
                    <Row center="xs">
                        <Col {...colProps}>
                            <div className={classes.filterContent}>
                                <Button
                                    raised
                                    color="primary"
                                    className={classes.filterButton}
                                >
                                    Filter and Sort
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row center="xs">
                        <Col xs={6} sm={4} md={3} lg={2}>
                            <CategoryFilter
                                selected={category}
                                options={categories}
                                onChange={this.handleChangeCategoryFilter}
                            />
                        </Col>
                        <Col xs={6} sm={4} md={3} lg={2}>
                            <OrderByFilter
                                selected={orderBy}
                                onChange={this.handleChangeOrderByFilter}
                            />
                        </Col>
                    </Row>
                    {posts.map(post => (
                        <Row center="xs" key={post.id}>
                            <Col {...colProps}>
                                <PostListItem
                                    post={post}
                                    onOpenPost={this.handleOpenPost}
                                    onEditPost={this.handleEditPost}
                                    onRemovePost={this.handleRemovePost}
                                    onVoteDown={this.handleVoteDown}
                                    onVoteUp={this.handleVoteUp}
                                />
                            </Col>
                        </Row>
                    ))}
                </Grid>
                <Button
                    fab
                    color="primary"
                    className={classes.addButton}
                    onClick={this.handleNewPost}
                >
                    <AddIcon/>
                </Button>
                <PostModal
                    open={postModalOpen}
                    categories={categories}
                    post={selectedPost}
                    onCancel={this.handleCancelPostModal}
                    onSavePost={this.handleSavePostModal}
                />
            </div>
        );
    }
}

CategoryPosts.defaultProps = {
    posts: [],
    categories: []
};

CategoryPosts.propTypes = {
    posts: PropTypes.arrayOf(PostPropType),
    orderBy: PropTypes.string,
    category: PropTypes.string,
    categories: PropTypes.array,
    /* actions */
    getCategoryPosts: PropTypes.func.isRequired,
    saveNewPost: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    updatePostsFilter: PropTypes.func.isRequired,
    /* router */
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const orderBy = filterSelectors.getSelectedOderby(state);
    const category = filterSelectors.getSelectedCategory(state);

    return {
        posts: postsSelectors.getPosts(state, orderBy, category),
        categories: categoriesSelectors.getCategories(state),
        orderBy,
        category
    };
};

const mapDispatchToProps = {
    ...postsActions,
    ...categoriesActions,
    ...filterActions
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(CategoryPosts);