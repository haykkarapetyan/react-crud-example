import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import PostshelfList from './Postshelf-list'
import Post from './Post'
import './../styles/postshelf.css'
import './../styles/post.css'

export const Postshelf = () => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [posts, setPosts] = useState([])
    const [updatedId, setUpdatedId] = useState(null)
    const [showedPost, setShowedPost] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        axios
            .get('http://localhost:4001/posts/all')
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => console.error(`There was an error retrieving the post list: ${error}`))
    }

    const handleInputsReset = () => {
        setAuthor('')
        setTitle('')
        setText('')
        setShowedPost(null)
        setUpdatedId(null)
    }

    const insertEditableData = (data) => {
        setAuthor(data.author)
        setTitle(data.title)
        setText(data.text)
    };

    const handlePostCreate = () => {
        axios
            .post('http://localhost:4001/posts/create', {
                author: author,
                title: title,
                text: text
            })
            .then(res => {
                console.log(res.data)
                fetchPosts()
            })
            .catch(error => console.error(`There was an error creating the ${title} post: ${error}`))
    }

    const handlePostUpdate = () => {
        axios
            .put('http://localhost:4001/posts/update', {
                id: updatedId,
                author: author,
                title: title,
                text: text
            })
            .then(res => {
                console.log(res.data)
                fetchPosts()
            })
            .catch(error => console.error(`There was an error creating the ${title} post: ${error}`))
    }

    const handlePostSubmit = (event) => {
        event.preventDefault();

        if (title.length > 0 && author.length > 0 && text.length > 0) {
            if (updatedId) {
                handlePostUpdate()
                handleInputsReset()
            } else {
                handlePostCreate()
                handleInputsReset()
            }
        }
    }

    const handlePostRemove = (id, title) => {
        axios
            .put('http://localhost:4001/posts/delete', { id: id })
            .then(() => {
                fetchPosts()
                if (id === showedPost.id) {
                    setShowedPost(null)
                }
            })
            .catch(error => console.error(`There was an error removing the ${title} post: ${error}`))
    }

    const handlePostEdit = (id) => {
        axios
        .put('http://localhost:4001/posts/edit', { id: id })
        .then((response) => {
            insertEditableData(response.data[0])
            fetchPosts()
            setUpdatedId(id)
        })
        .catch(error => console.error(`There was an error removing the ${title} post: ${error}`))
    }

    const handleShow = (id) => {
        handleInputsReset()
        axios
        .put('http://localhost:4001/posts/show', { id: id })
        .then((response) => {
            setShowedPost(response.data[0])
        })
        .catch(error => console.error(`There was an error removing the ${title} post: ${error}`))
    }    

    return (
        <div>
            <div className="post-list-wrapper">
                <div className="post-list-form shadow">
                    <Form onSubmit={handlePostSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="title">Title:</Form.Label>
                            <Form.Control type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="author">Author:</Form.Label>
                            <Form.Control type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="text">Text:</Form.Label>
                            <Form.Control as="textarea" rows="5" id="text" name="text" value={text} onChange={(e) => setText(e.currentTarget.value)} />
                        </Form.Group>
                        <button onClick={handlePostSubmit} className={"btn btn-sm btn-block " + (updatedId ? 'btn-success' : 'btn-info')}>
                            {updatedId ? 'Update post' : 'Add the post'}
                        </button>
                    </Form>
                </div>
                <PostshelfList 
                    posts={posts} 
                    handlePostRemove={handlePostRemove} 
                    handlePostEdit={handlePostEdit}
                    handleShow={handleShow}
                />
            </div>
            {(showedPost !== null) ? <Post showedPost={showedPost} /> : null}
        </div>
    )
}