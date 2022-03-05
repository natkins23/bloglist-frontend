import { useState } from 'react'

function NewBlogForm({ createBlog }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleTitleChange = ({ target }) => setTitle(target.value)
    const handleAuthorChange = ({ target }) => setAuthor(target.value)
    const handleUrlChange = ({ target }) => setUrl(target.value)

    const addBlog = async event => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <>
            <h2>Add Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input type="text" value={title} name="Title" onChange={handleTitleChange} />
                </div>
                <div>
                    author:
                    <input type="text" value={author} name="Author" onChange={handleAuthorChange} />
                </div>
                <div>
                    url:
                    <input type="text" value={url} name="url" onChange={handleUrlChange} />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}
export default NewBlogForm
