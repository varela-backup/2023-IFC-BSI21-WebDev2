import { FocusEvent, KeyboardEvent, useState } from "react"
import './App.css'

export default function App() {
  const [currentItem, setCurrentItem] = useState<number | null>(null)
  const [todolist, setTodolist] = useState<string[]>(
    JSON.parse(localStorage.getItem('todolist') ?? '[]')
  )


  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''
      const newTodolist = [value, ...todolist]
      setTodolist(newTodolist)
      localStorage.setItem('todolist', JSON.stringify(newTodolist))
    }
  }

  const removeItem = (index: number) => {
    const newTodolist = todolist.filter((_, key) => key !== index)
    setTodolist(newTodolist)
    localStorage.setItem('todolist', JSON.stringify(newTodolist))
  }

  const onUpdateFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (currentItem)
      event.currentTarget.value = todolist[currentItem]
  }

  const updateInputFn = (event: KeyboardEvent<HTMLInputElement>, key: number) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      const newTodolist = todolist.map((todo, index) => index === key ? value : todo)
      console.log(newTodolist)
      setTodolist(newTodolist)
      localStorage.setItem('todolist', JSON.stringify(newTodolist))
    }
  }

  return <>
    <h1>Lista de tarefas</h1>
    <input className="input-action" type="text" onKeyDown={onKeyDown} />
    <ul>
      {/* <li className="pending">pending</li> */}
      {/* <li className="synced">synced</li> */}
      {/* <li className="error">error</li> */}
      {todolist.map((todo, key) =>
        <li key={key} className="synced">
          <button onClick={() => removeItem(key)}>remove</button>
          <button onClick={() => setCurrentItem(key)}>update</button>
          {key === currentItem
            ? <input
              data-id={key}
              onFocus={onUpdateFocus}
              onKeyDown={e => updateInputFn(e, key)} />
            : <span>{todo}</span>}
        </li>
      )}
    </ul>
  </>
}
