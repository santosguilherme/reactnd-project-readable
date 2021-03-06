import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {injectIntl, FormattedMessage} from 'react-intl';

import {Grid, Row, Col} from 'react-flexbox-grid';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';
import {actions as categoriesActions, selectors as categoriesSelectors} from '../../redux/modules/categories';
import {actions as filterActions, selectors as filterSelectors} from '../../redux/modules/postsFilter';

import AppBar from '../../commons/components/AppBar/AppBar'
import PostModal from '../components/PostModal';
import PostListItem from '../components/PostListItem';
import If from '../../commons/components/If/If';

import CategoryPropType from '../Category/CategoryPropType';
import CategoryFilter from './CategoryFilter';
import OrderByFilter from './OrderByFilter';
import PostPropType from '../PostPropType';

import './postList.css';


class PostList extends Component {
    state = {
        postModalOpen: false,
        selectedPost: undefined
    };

    componentDidMount() {
        const {getAllCategories} = this.props;
        getAllCategories();
    }

    handleOpenPost = post => {
        const {history} = this.props;
        const {id, category} = post;

        history.push(`${category}/${id}`, {from: history.location.pathname});
    };

    handleSaveNewPost(post) {
        const {saveNewPost} = this.props;

        saveNewPost(post);
        this.setState({postModalOpen: false});
    }

    handleUpdatePost(post) {
        const {updatePost} = this.props;

        updatePost(post);
        this.setState({postModalOpen: false, selectedPost: undefined});
    }

    handleSavePostModal = post => {
        const {selectedPost} = this.state;

        selectedPost
            ? this.handleUpdatePost(post)
            : this.handleSaveNewPost(post);
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
        history.push(category, {category});
    };

    render() {
        const {postModalOpen, selectedPost} = this.state;
        const {intl, posts, categories, orderBy, category} = this.props;
        const colProps = {xs: 12, sm: 8, md: 6, lg: 4};
        const appBarTitle = intl.formatMessage({id: 'LABELS.APP_BAR_POST_LIST'}, {
            category: category || intl.formatMessage({id: 'LABELS.ALL_POSTS'})
        });

        return (
            <div className="post-list">
                <AppBar title={appBarTitle}/>
                <Grid fluid>
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
                    <If test={!posts.length}>
                        <Typography
                            type="subheading"
                            component="p"
                            align="center"
                        >
                            <FormattedMessage id="LABELS.POSTS_NOT_FOUND"/>
                        </Typography>
                    </If>
                </Grid>
                <Button
                    fab
                    color="primary"
                    className="post-list__add-button"
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

PostList.defaultProps = {
    posts: [],
    categories: []
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(PostPropType),
    orderBy: PropTypes.string,
    category: PropTypes.string,
    categories: PropTypes.arrayOf(CategoryPropType),
    /* actions */
    getAllPosts: PropTypes.func.isRequired,
    saveNewPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    updatePostsFilter: PropTypes.func.isRequired,
    /* router */
    history: PropTypes.object.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
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
    injectIntl
)(PostList);