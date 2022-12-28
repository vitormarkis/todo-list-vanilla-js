import { btn_action, inp_action } from "./local-variables.js"

const lang = {
    init: {
        btn_action: 'Adicionar',
        inp_action: 'Adicione uma nova tarefa',
    },
    editing_todo: {
        btn_action: 'Salvar',
    },
}

const updateLanguague = {
    init: estado => {
        let arr = Object.entries(lang[estado])
        eval(arr[0][0]).innerText = arr[0][1]
        eval(arr[1][0]).placeholder = arr[1][1]
    },
    editing_todo: estado => {
        let arr = Object.entries(lang[estado])
        eval(arr[0][0]).innerText = arr[0][1]
    }
}

export function checkLanguage(estado) {
    state = estado // estado: string
    for(let props in lang) {
        if(props === state) updateLanguague[props](estado)
    }
}


