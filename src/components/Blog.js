import { useState } from 'react'

function BlogDetails({ blog, visible, likeBlog, removeBlog, own }) {
    if (!visible) return null
    return (
        <div>
            <p>by: {blog.author}</p>
            <a href="blog.url">{blog.url} </a>
            <p>
                likes:{blog.likes}
                <button type="button" onClick={() => likeBlog(blog)}>
                    like
                </button>
            </p>
            {own && (
                <button type="button" onClick={() => removeBlog(blog)}>
                    remove
                </button>
            )}
        </div>
    )
}

function Blog({ blog, likeBlog, removeBlog, own }) {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        marginBottom: 5,
    }
    const viewBtnStyle = {
        margin: 5,
    }
    return (
        <div style={blogStyle}>
            {blog.title}
            <button type="button" style={viewBtnStyle} onClick={toggleVisibility}>
                {visible ? 'hide' : 'view'}
            </button>
            <BlogDetails blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} visible={visible} own={own} />
        </div>
    )
}

export default Blog
