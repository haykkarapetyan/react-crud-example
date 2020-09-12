
import React from 'react'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import PostshelfListRow from './Postshelf-list-row';
import './../styles/postshelf-list.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class PostshelfList extends React.Component {

    render() {
        const { posts, handlePostRemove, handlePostEdit, handleShow } = this.props;
        return (
            <div className="tableContainer shadow">
                <Table bordered="true" className="mb-0">
                    <thead>
                        <tr>
                            <th className="table-head-item">#</th>
                            <th className="table-head-item">Title</th>
                            <th className="table-head-item">Author</th>
                            <th className="table-head-item">Text</th>
                            <th className="table-head-item">Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post, idx) => (
                                <PostshelfListRow
                                    key={post.id}
                                    post={post}
                                    id={idx + 1}
                                    handlePostRemove={handlePostRemove}
                                    handlePostEdit={handlePostEdit}
                                    handleShow={handleShow}
                                />
                            )
                            )
                        ) : (
                                <tr>
                                    <td style={{ textAlign: 'center', padding: 20 }} colSpan={4}>
                                        There are no posts to show. Create one!
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

PostshelfList.propTypes = {
    posts: PropTypes.array.isRequired,
    handlePostRemove: PropTypes.func.isRequired,
    handlePostEdit: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
};

export default PostshelfList