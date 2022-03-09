import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('getByText - blog renders the blog title only', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'fso',
        url: 'fso.com',
        likes: 0,
    }

    render(<Blog blog={blog} className="blo g" />)

    const titleElement = screen.getByText('Component testing is done with react-testing-library')
    const authorElement = screen.queryByText('fso')
    const urlElement = screen.queryByText('fso.com')
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeNull()
    expect(urlElement).toBeNull()
})

test('css selectors - component displaying a blog renders the blog title only', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'fso',
        url: 'fso.com',
        likes: 0,
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    screen.debug(div)
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).not.toHaveTextContent('fso')
    expect(div).not.toHaveTextContent('fso.com')
})
