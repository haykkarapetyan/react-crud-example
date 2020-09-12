import React from 'react'
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'react-bootstrap';

class PostshelfListRow extends React.Component {

    truncate (string, value) {
        return string.length > value ? (string || '').substring(0, value) + '…' : string;
    }

    render() {
        const {post, handlePostRemove, handlePostEdit, handleShow} = this.props;
        return(
            <tr className="table-row">
                <td className="table-item">
                    {post.id}
                </td>
                <td className="table-item">
                    { this.truncate(post.title, 10) }
                </td>
                <td className="table-item">
                    { this.truncate(post.author, 10) }
                </td>
                <td className="table-item">
                    { this.truncate(post.text, 50) }
                </td>
                <td className="table-item">
                    <ButtonGroup>
                        <Button 
                            className="table-btn btn-sm"
                            variant="outline-danger"
                            onClick={() => handlePostRemove(post.id, post.title)}>
                            Delete
                        </Button>
                        <Button 
                            className="table-btn btn-sm"
                            variant="outline-primary"
                            onClick={() => handlePostEdit(post.id)}>
                            Edit
                        </Button>
                        <Button 
                            className="table-btn btn-sm"
                            variant="outline-success"
                            onClick={() => handleShow(post.id)}>
                            Show
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        
        );

    }
}

PostshelfListRow.propTypes = {
    id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    handlePostRemove: PropTypes.func.isRequired,
    handlePostEdit: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

export default PostshelfListRow