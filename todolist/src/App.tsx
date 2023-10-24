import { useState } from "react"
import Header from "./Header"
import Input from "./Input"
import List from "./List"
import './App.css'

export default function App() {
  const [todolist, setTodolist] = useState<string[]>(
    JSON.parse(localStorage.getItem('todolist') ?? '[]')
  )

  return <>
    <Header />
    <Input setTodolist={setTodolist} todolist={todolist} />
    <List setTodolist={setTodolist} todolist={todolist} />
  </>
}
