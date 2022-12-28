import { all_items_body } from "./local-variables.js"

function createTodoElements() {
    let $todo_item_div = document.createElement('div')
    $todo_item_div.classList.add('todo-item-div')

    let $span_todo_item = document.createElement('div')
    $span_todo_item.classList.add('span-todo-item')
    let $btns_todo_item = document.createElement('div')
    $btns_todo_item.classList.add('btns-todo-item')

    let span = document.createElement('span')
    let btn_concluir = document.createElement('button')
    btn_concluir.innerText = 'Concluir'
    let btn_editar = document.createElement('button')
    btn_editar.innerText = 'Editar'
    let btn_remover = document.createElement('button')
    btn_remover.innerText = 'Remover'
    let btn_details = document.createElement('button')
    btn_details.innerText = 'Detalhes'
    
    Array.from([btn_details, btn_concluir, btn_editar, btn_remover]).forEach(btn => $btns_todo_item.appendChild(btn))

    $span_todo_item.appendChild(span)
    $todo_item_div.appendChild($span_todo_item)

    return [$todo_item_div,  $btns_todo_item]
}

export function assignTodoElements(idx) {
    let db_client = getDatabase()
    let item = db_client[idx]
    let [$todo_item_div,  $btns_todo_item] = createTodoElements()
    // console.log($btns_todo_item)

    $todo_item_div.querySelector('.span-todo-item > span').innerText = item.name

    let btns = Array.from($btns_todo_item.querySelectorAll('button')) // Array
    btns[0].setAttribute('data-id', `details-${idx}`)
    btns[1].setAttribute('data-id', `conclude-${idx}`)
    btns[2].setAttribute('data-id', `edit-${idx}`)
    btns[3].setAttribute('data-id', `remove-${idx}`)

    if(!item.active) $todo_item_div.classList.add('item-completed')
    
    return [$todo_item_div, $btns_todo_item]
}

function printTodoElement(idx) {
    let [$todo_item_div, $btns_todo_item] = assignTodoElements(idx)
    // console.log('$todo_item_div')
    // console.log($todo_item_div)
    // console.log('$btns_todo_item')
    // console.log($btns_todo_item)
    $todo_item_div.appendChild($btns_todo_item)
    all_items_body.appendChild($todo_item_div)
}

export function printAllTodoElements() {
    let db_client = getDatabase()
    for(let i = 0; i < db_client.length; i++) {
        printTodoElement(i)
    }
}

export function toggleHide(ele) {
    ele.classList.toggle('hide')
}