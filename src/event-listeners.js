import { bg_dark, details_btn_update, details_text, details_textarea } from "./local-variables.js"
import { action, buttonAction, detailsEditModal, pathToggleModal, textareaAutoHeight } from "./actions.js"

           bg_dark.addEventListener('click', pathToggleModal)
          document.addEventListener('click', buttonAction)
details_btn_update.addEventListener('click', action.details)
  details_textarea.addEventListener('keyup', textareaAutoHeight)
      details_text.addEventListener('click', detailsEditModal)