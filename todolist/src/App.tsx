import { KeyboardEvent, useState } from "react"

export default function App() {
  const [todolist, setTodolist] = useState([ 'Fazer café', 'Estudar React', 
  'Ir para o estágio'])

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''
      setTodolist([...todolist, value])
    }
  }

  return <>
    <h1>Lista de tarefas</h1>
    <input type="text" onKeyDown={onKeyDown} />
    <ul>
      {todolist.map((todo, key) =>
        <li key={key}>
          <button>remove</button> {todo}
        </li>
      )}
    </ul>
  </>
}
