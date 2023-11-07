import { useEffect, useState } from "react"
import Header from "./Header"
import Input from "./Input"
import List from "./List"
import './App.css'

export default function App() {
  const [todolist, setTodolist] = useState<{id: number, text: string}[]>(
    JSON.parse(localStorage.getItem('todolist') ?? '[]')
  )

  useEffect(() => {
    fetch("http://localhost:3000/item")
      .then(response => response.json())
      .then(data => {
        setTodolist(data)
      })
  }, [])


  return <>
    <Header />
    <Input setTodolist={setTodolist} todolist={todolist} />
    <List setTodolist={setTodolist} todolist={todolist} />
  </>
}
