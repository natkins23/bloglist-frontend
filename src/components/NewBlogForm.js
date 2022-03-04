function NewBlogForm({ addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) {
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
