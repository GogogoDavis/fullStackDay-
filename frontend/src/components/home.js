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


  return (
    <>
      <div>
        {todo_data ?
        <ol>
          {todo_data.map(item => {
            return (<li>{item.toDo}</li>)
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
