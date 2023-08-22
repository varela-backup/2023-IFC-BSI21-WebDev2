function createAction() {
    const actionBar = document.createElement("div")
    const input = document.createElement("input")
    const addButton = document.createElement("button")
    addButton.textContent = "ADICIONAR"
    actionBar.append(input, addButton)
    return { actionBar, input, addButton }
}

function createList() {
    return document.createElement("div")
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
    const { actionBar, addButton, input } = createAction()
    const list = createList()
    rootElement.append(actionBar, list)

    addButton.addEventListener("click", () => {
        const { item } = createItem(input.value)
        list.append(item)
    })
}