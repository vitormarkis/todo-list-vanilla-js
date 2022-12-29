import { clearInput, clearItems, resetDetailsModal } from "./functionals.js"
import { checkLanguage } from "./language.js"
import { printAllTodoElements } from "./layout-man.js"
import { todo_detail_span, details_p } from "./local-variables.js"

export function refresh() {
    state = 'init'
    checkLanguage(state)
    editing_id = undefined
    STATE_EDITING = false
    SEEING_ID = undefined
    DETAILS_EDITING = false
    todo_detail_span.innerHTML = ''
    details_p.innerHTML = ''
    clearInput()
    clearItems()
    resetDetailsModal()
    printAllTodoElements()
}

refresh()