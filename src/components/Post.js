import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

class Post extends Component {
    render() {
        const { showedPost } = this.props;
        return (
            <div className="result-block shadow">
                <h6>Show Post</h6>

                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <strong>Author</strong>
                        <p>{showedPost.author}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Title</strong>
                        <p>{showedPost.title}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Text</strong>
                        <p>{showedPost.text}</p>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        )
    }
}

Post.propTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    showedPost: PropTypes.object.isRequired,
};

export default Post