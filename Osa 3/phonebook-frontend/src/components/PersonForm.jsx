import personService from '../services/persons'

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotification }) => {

  const handleAdd = (event) => {
    event.preventDefault()
    const existing = persons.find(p => p.name === newName)
    if (existing) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObj = { name: newName, number: newNumber }
    personService.create(personObj)
      .then(returned => {
        setPersons(persons.concat(returned))
        setNotification(`Added ${newName}`)
        setTimeout(() => setNotification(null), 3000)
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={handleAdd}>
      <div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
      <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm
