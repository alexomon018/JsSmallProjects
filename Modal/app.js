// select modal-btn,modal-overlay,close-btn
// listen for click events on modal-btn and close-btn
// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay

const modalBtn = document.querySelector('.modal-btn')
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('close-btn')

function handleModalButton() {
  modalOverlay.classList.add('open-modal')
}
function handleCloseButton() {
  modalOverlay.classList.remove('open-modal')
}
