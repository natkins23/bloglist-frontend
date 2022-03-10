import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog', () => {
    const onLike = jest.fn()

    beforeEach(() => {
        const blog = {
            title: 'Testing is easy',
            author: 'Kalle Ilves',
            url: 'fso.com',
            likes: 5,
        }

        render(<Blog blog={blog} likeBlog={onLike} removeBlog={() => {}} />)
    })
    test('getByText - blog renders the blog title only', () => {
        const titleElement = screen.getByText('Testing is easy')
        const authorElement = screen.queryByText('Kalle Ilves')
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

        const { container } = render(<Blog blog={blog} likeBlog={() => {}} removeBlog={() => {}} />)

        const div = container.querySelector('.blog')
        screen.debug(div)
        expect(div).toHaveTextContent('Component testing is done with react-testing-library')
        expect(div).not.toHaveTextContent('fso')
        expect(div).not.toHaveTextContent('fso.com')
    })

    test('when expanded also url and like rendered', async () => {
        const button = screen.getByText('view')
        userEvent.click(button)

        screen.debug()

        const urlElement = screen.getByText('fso.com')
        expect(urlElement).toBeDefined()

        const likesElement = screen.getByText('likes:5')
        expect(likesElement).toBeDefined()
    })

    test('when liked twice, handler is called twice', () => {
        const viewBtn = screen.getByText('view')
        userEvent.click(viewBtn)
        const likeBtn = screen.getByText('like')
        userEvent.click(likeBtn)
        userEvent.click(likeBtn)
        expect(onLike.mock.calls).toHaveLength(2)
    })
})
