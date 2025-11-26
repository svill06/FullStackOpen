import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && <div>{children}<button onClick={toggleVisibility}>cancel</button></div>}
    </div>
  )
})

export default Togglable
