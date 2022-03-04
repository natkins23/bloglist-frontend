import { useState } from 'react'

function Togglable({ buttonLabel, children }) {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type="button" onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button type="button" onClick={toggleVisibility}>
                    cancel
                </button>
            </div>
        </div>
    )
}

export default Togglable
