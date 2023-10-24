import { KeyboardEvent, useState } from "react"
import './App.css'

export default function App() {
  const [todolist, setTodolist] = useState<string[]>(
    JSON.parse(localStorage.getItem('todolist') ?? '[]')
  )

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''
      const newTodolist = [...todolist, value]
      setTodolist(newTodolist)
      localStorage.setItem('todolist', JSON.stringify(newTodolist))
    }
  }

  // const removeItem = (key: number) => {
  //   const newTodolist = [...todolist]
  //   newTodolist.splice(key, 1)
  //   setTodolist(newTodolist)
  // }

  const removeItem = (index: number) => {
    const newTodolist = todolist.filter((_, key) => key !== index)
    setTodolist(newTodolist)
    localStorage.setItem('todolist', JSON.stringify(newTodolist))
  }

  return <>
    <h1>Lista de tarefas</h1>
    <input type="text" onKeyDown={onKeyDown} />
    <ul>
      <li className="pending">pending</li>
      <li className="synced">synced</li>
      <li className="error">error</li>
      {todolist.map((todo, key) =>
        <li key={key} className="synced">
          <button onClick={() => removeItem(key)}>remove</button> 
          <button>update</button>
          <span>{todo}</span>
        </li>
      )}
    </ul>
  </>
}
