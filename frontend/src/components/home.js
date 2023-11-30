import { useState, useEffect } from "react";

export const Home = () => {
  const [todo_data, setTodo_data] = useState()
  const [newItem, setNewItem] = useState()
  const [updateText, setUpdateText] = useState('');

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

  const handleDelete = (id) => { 
    const queryParams = `?id=${id}`
    fetch(`http://localhost:8080/delete/${queryParams}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const sendUpdate = (id) => {
    
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
            return (<>
              <button onClick={() => handleDelete(item.id)}>X</button>
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
                  {item.toDo}
                  <button onClick={() => handleUpdate(item.id)}>Edit</button>
                </>
              }
            </>)
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
