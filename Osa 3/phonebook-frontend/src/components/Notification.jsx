const Notification = ({ message }) => {
  if (!message) return null
  return <div style={{ color: 'green', border: '1px solid green', padding: '5px', margin: '5px 0' }}>{message}</div>
}
export default Notification
