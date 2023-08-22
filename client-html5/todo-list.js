let style

function createLinkStyle() {
    if (style) return
    style = document.createElement("link")
    style.rel = "stylesheet"
    style.href = "todo-list.css" // @REFATORAR
    document.head.append(style)
}

function createAction() {
    const actionBar = document.createElement("div")
    const input = document.createElement("input")
    const addButton = document.createElement("button")
    addButton.textContent = "ADICIONAR"
    actionBar.append(input, addButton)
    actionBar.className = "action-bar"
    return { actionBar, input, addButton }
}

function createList() {
    const list  = document.createElement("div")
    list.className = "list"
    return list
}

function createItem(labelText) {
    const item = document.createElement("div")
    const checkbox = document.createElement("input")
    const btDelete = document.createElement("button")
    const label = document.createElement("span")
    checkbox.type = "checkbox"
    btDelete.textContent = "remove"
    label.textContent = labelText
    item.append(checkbox, label, btDelete)
    return { item, checkbox, label, btDelete }
}

export default function (rootElement) {
    if (!(rootElement instanceof HTMLElement)) return
    createLinkStyle()
    const { actionBar, addButton, input } = createAction()
    const list = createList()
    rootElement.className = "varela-todo-list"
    rootElement.append(actionBar, list)

    const addNewItem = () => {
        if (input.value == "") return
        const { item, btDelete } = createItem(input.value)
        btDelete.addEventListener("click", () => item.remove())
        input.value = ""
        list.append(item)
    }

    // input.addEventListener("keydown", ({ key }) => key == "Enter" && addNewItem())
    
    input.addEventListener("keydown", (ev) => {
        if(ev.key == " " && input.value == "")
            return ev.preventDefault()
        if (ev.key == "Enter") addNewItem()
    })

    addButton.addEventListener("click", addNewItem)
}