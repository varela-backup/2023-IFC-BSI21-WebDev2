import { KeyboardEvent } from "react"
import { TTodoRestItem } from "./App"

type TProps = { 
  todolist: TTodoRestItem[], 
  setTodolist: (todolist: TTodoRestItem[]) => void 
}

export default function (props: TProps) {
  const { todolist, setTodolist } = props

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''
      const newTodolist = [value, ...todolist]
      setTodolist(newTodolist)
      localStorage.setItem('todolist', JSON.stringify(newTodolist))
    }
  }

  return <>
    <input className="input-action" type="text" onKeyDown={onKeyDown} />
  </>
}