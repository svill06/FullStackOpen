import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initial => setPersons(initial))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName, number: newNumber }

    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== returnedPerson.id).concat(returnedPerson))
        setNotification(`${returnedPerson.name} added/updated`)
        setTimeout(() => setNotification(null), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotification(error.response.data.error)
        setTimeout(() => setNotification(null), 5000)
      })
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameOnChange={e => setNewName(e.target.value)}
        numberValue={newNumber}
        numberOnChange={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
