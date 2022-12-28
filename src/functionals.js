import { toggleHide } from "./layout-man.js"
import { all_items_body, bg_dark, details_edit, details_p, details_text, details_textarea, inp_action } from "./local-variables.js"

export function toggleDetailsInput(str) {
    details_textarea.value = str
    let heigth = details_p.offsetHeight
    details_textarea.style.height = `${heigth}px`
    
    const focusTextArea = () => {
        details_textarea.focus()
        details_textarea.setSelectionRange(length, length)
        details_textarea.focus()
    }
    setTimeout(focusTextArea, 1);
    details_edit.classList.toggle('hide')
    details_text.classList.toggle('hide')
}

export function cleanItems() {
    all_items_body.innerHTML = ''
}

export function toggleModal() {
    toggleHide(bg_dark)
}

export function resetDetailsModal() {
    if(!bg_dark.classList.contains('hide')) bg_dark.classList.add('hide')
    details_textarea.value = ''
    details_edit.classList.add('hide')
    details_text.classList.remove?.('hide')
}

export function cleanInput () { inp_action.value = '' }

export function pulseToggle(element) {
    element.closest('.todo-item-div').classList.toggle('pulse')
}

export function digActionId(e) {
    return e.composedPath().reduce((acc, item) => {
         let [action, id] = item.getAttribute?.('data-id')?.split('-') || ''
         if(action) {
             acc = [...acc,...[action, id]]
             acc.push(item)    
         }
         return acc
     },[])
}