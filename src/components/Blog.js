import { useState } from 'react'

function BlogDetails({ blog, visible, likeBlog }) {
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
        </div>
    )
}

function Blog({ blog, likeBlog }) {
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
            <BlogDetails blog={blog} likeBlog={likeBlog} visible={visible} />
        </div>
    )
}

export default Blog
