import personService from '../services/persons'

const Persons = ({ persons, filter, setPersons }) => {

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const filtered = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <ul>
      {filtered.map(p => 
        <li key={p.id}>
          {p.name} {p.number} 
          <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons
