import { FocusEvent, KeyboardEvent, useState } from "react"

type TProps = {
  todolist: string[],
  setTodolist: (todolist: string[]) => void
}

export default function (props: TProps) {
  const { todolist, setTodolist } = props
  const [currentItem, setCurrentItem] = useState<number | null>(null)

  const updateInputFn = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const key = currentItem as number
    todolist[key] = value
    setTodolist(todolist)
    localStorage.setItem('todolist', JSON.stringify(todolist))
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

  return <>
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
              onKeyDown={updateInputFn} />
            : <span>{todo}</span>}
        </li>
      )}
    </ul>
  </>
}