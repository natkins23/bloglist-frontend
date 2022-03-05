import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(ref, () => ({
        toggleVisibility,
    }))
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
})

export default Togglable
