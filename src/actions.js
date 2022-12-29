import { digActionId, pulseToggle, toggleDetailsInput, toggleModal } from "./functionals.js"
import { refresh } from "./init.js"
import { checkLanguage } from "./language.js"
import { assignTodoElements } from "./layout-man.js"
import { inp_item, todo_detail_span, details_textarea, inp_action } from "./local-variables.js"

// Objeto com as funções dos botões de cada item
export const action = {
    // Muda o estado do item, entre concluido e a fazer
    conclude: (id, db_client) => {
        db_client[id].active = !db_client[id].active
        setDatabase(db_client)
        refresh()
    },
    // 
    edit: function(id, db_client, item) {
        if(STATE_EDITING && editing_id !== id) return
        
        editing_id = id
        STATE_EDITING = true
        inp_item.value = db_client[id].name   
        state = 'editing_todo'
        
        
        checkLanguage(state)
        pulseToggle(item)
        
        
        inp_item.addEventListener('input', () => updateInput(item))
    },
    remove: id => {
        removeItem(id)
        refresh()
    },
    see_details: id => {
        let db_client = getDatabase()
        SEEING_ID = id
        toggleModal()
        renderDetailsFields(id, db_client)
    },
    save_details: () => {
        if(!SEEING_ID) return
        let db_client = getDatabase()

        updateDetails(db_client)

        toggleModal()
        refresh()
    },
}

function renderDetailsFields(id, db_client) {
    let $todo_item_div = assignTodoElements(SEEING_ID)[0]
    let details = document.querySelector('.todo-div-info > p')
    $todo_item_div.classList.add('pulse')
    todo_detail_span.appendChild($todo_item_div)

    if(db_client[id].details === '') {
        details.innerText = 'Escreva uma explicação sobre...'
    } else {
        details.innerText = db_client[id].details
    }
}

const updateDetails = db_client => registerNewTextInDatabase(SEEING_ID, db_client)

export async function buttonAction(e) {
    let db_client = getDatabase()
    let resp = await digActionId(e)
    let [acao, id, item] = resp

    
    if(!action?.[acao]) return

    action[acao](id, db_client, item)
}

export function buttonSaveUpdate() {
    let new_value = inp_action.value
    if(!STATE_EDITING) {
        if(!inp_action.value) return
        registerItem(newValue(new_value))
    } else {
        updateItem(newValue(new_value, editing_id),editing_id)
    }
    refresh()
}

// ===============================================

function updateInput(item) {
    if(!STATE_EDITING) return
    item.closest('.todo-item-div').getElementsByTagName('span')[0].innerText = inp_item.value
}

function registerNewTextInDatabase(id, db_client) {
    db_client[id].details = details_textarea.value
    setDatabase(db_client)
}

export function pathToggleModal(e) {
    if(e.composedPath()[0].className !== 'bg-dark') return
    toggleModal()
    refresh()
}

export function detailsEditModal() {
    let db_client = getDatabase()
    toggleDetailsInput(db_client[SEEING_ID].details)
}

export async function textareaAutoHeight(e) {
    details_textarea.style.height = 'auto'
    let a = e.target.scrollHeight;
    details_textarea.style.height = `${a}px`
}


