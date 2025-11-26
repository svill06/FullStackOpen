const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    border: 'solid 1px',
    padding: 10,
    marginBottom: 10
  }

  return <div style={style}>{message}</div>
}

export default Notification
