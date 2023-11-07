import { FocusEvent, KeyboardEvent, useState } from "react"

type TProps = {
  todolist: { id: number, text: string }[],
  setTodolist: (todolist: { id: number, text: string }[]) => void
}

export default function (props: TProps) {
  const { todolist, setTodolist } = props
  const [currentItem, setCurrentItem] = useState<number | null>(null)

  const updateInputFn = (event: KeyboardEvent<HTMLInputElement>) => {
    // const value = event.currentTarget.value
    // const key = currentItem as number
    // todolist[key] = value
    // setTodolist(todolist)
    // localStorage.setItem('todolist', JSON.stringify(todolist))
  }

  const removeItem = async (id: number) => {
    const response = await fetch(`http://localhost:3000/item/${id}`, { method: 'DELETE' })
    const newTodolist = todolist.filter((val, key) => val.id !== id)
    setTodolist(newTodolist)
  }

  const onUpdateFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    // if (currentItem)
    //   event.currentTarget.value = todolist[currentItem]
  }

  return <>
    <ul>
      {/* <li className="pending">pending</li> */}
      {/* <li className="synced">synced</li> */}
      {/* <li className="error">error</li> */}
      {todolist.map((todo, key) =>
        <li key={key} data-id={todo.id} className="synced">
          <button onClick={() => removeItem(todo.id)}>remove</button>
          <button onClick={() => setCurrentItem(todo.id)}>update</button>
          {key === currentItem
            ? <input
              data-id={key}
              onFocus={onUpdateFocus}
              onKeyDown={updateInputFn} />
            : <span>{todo.text}</span>}
        </li>
      )}
    </ul>
  </>
}