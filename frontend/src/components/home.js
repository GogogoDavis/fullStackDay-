import { useState, useEffect } from "react";

export const Home = () => {
  const [todo_data, setTodo_data] = useState()
  const [newItem, setNewItem] = useState()

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(res => res.json())
      .then(data => setTodo_data(data))
  }, [])

  const handleNewItem = (e) => {
    const queryParams = `?newItem=${newItem}`
    fetch(`http://localhost:8080/${queryParams}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  }
  
  const handleInputChange = (e) => {
    setNewItem(e.target.value)
  }
  const handleUpdateItem = (e) => {
    
  }

  const handleDelete = (id) => { 
    const queryParams = `?id=${id}`
    fetch(`http://localhost:8080/delete/${queryParams}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  }

const handleUpdate = () => { 
  const queryParams = `?updateItem=${updateItem}`
  fetch(`http://localhost:8080/delete/${queryParams}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
})
  return ( 
    <form>
      <label>
          <input type="text" value={updateItem} onChange={handleUpdateItem}></input>
        </label>
      <button type='submit'>update</button>
    </form>
  )
}

  return (
    <>
      <div>
        {todo_data ?
        <ol>
          {todo_data.map(item => {
            return (<><button onClick={() => handleDelete(item.id)}>X</button><li>{item.toDo}</li><button onClick={() => handleUpdate()}></button></>)
          })}
        </ol>
        : <></>}
      </div>
      <form onSubmit={handleNewItem}>
        <label>
          <input type="text" value={newItem} onChange={handleInputChange}></input>
        </label>
        <button type="submit">add</button>
      </form>
</>
    )
};
