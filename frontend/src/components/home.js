import { useState, useEffect } from "react";

export const Home = () => {
  const [todo_data, setTodo_data] = useState()
  const [newItem, setNewItem] = useState()
  const [updateText, setUpdateText] = useState('');
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getTodoData()
  }, [])

  const getTodoData = () => {
    fetch('http://localhost:8080/')
    .then(res => res.json())
    .then(data => data.sort((a, b) => a.id - b.id))
    .then(sortedData => setTodo_data(sortedData))
  }

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

  const handleDelete = (id) => { 
    const queryParams = `?id=${id}`
    fetch(`http://localhost:8080/delete/${queryParams}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => getTodoData())
  }

  const sendUpdate = (id) => {
    const queryParams = `?id=${id}&updatedItem=${updateText}`
    fetch(`http://localhost:8080/${queryParams}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => getTodoData())
  }

  const handleUpdate = (id) => {
    setTodo_data((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  return (
    <>
      <div>
        {todo_data ?
        <ol>
          {todo_data.map(item => {
            return (<div className="list-container">
              <button className="x" onClick={() => handleDelete(item.id)}>X</button>
              <li>{item.toDo}</li>
              {item.isEditing ? 
                <form onSubmit={(e) => {handleUpdate(item.id); sendUpdate(item.id)}}>
                  <label>
                    <input type="text" value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
                  </label>
                  <button type="submit">Update</button>
                </form>
              : 
                <>
                  <button onClick={() => handleUpdate(item.id)}>Edit</button>
                </>
              }
            </div>)
          })}
        </ol>
        : <></>}
      </div>
      <form className='add-form' onSubmit={handleNewItem}>
        <label>
          <input type="text" value={newItem} onChange={handleInputChange}></input>
        </label>
        <button type="submit">add</button>
      </form>
</>
    )
};
