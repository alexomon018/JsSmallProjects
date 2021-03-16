// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.querySelector('#grocery')
const submitBtn = document.querySelector('submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('clear-btn')

// edit option

let editElement
let editFlag = false
let editID = ''

// ****** EVENT LISTENERS **********
//submit form
function addItem(e) {
  e.preventDefault()
  const value = grocery.value
  const id = new Date().getTime().toString()
  if (value && !editFlag) {
    const element = document.createElement('article')
    //add class
    element.classList.add('grocery-item')
    //add id
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <button class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button  class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>`
    const editBtn = element.children[1].children[0]
    const deleteBtn = element.children[1].children[1]
    editBtn.onclick = function () {
      editItem(event)
    }
    deleteBtn.onclick = function () {
      deletItem(event)
    }
    //append child
    list.appendChild(element)
    displayAlert('You have added the item', 'success')
    container.classList.add('show-container')

    //add to local storage
    addToLocalStorage(id, value)
    setBackToDefault()
  } else if (value && editFlag) {
    console.log('edditing')
  } else {
    displayAlert('Please enter value', 'danger')
  }
}
//edit item
function editItem() {
  console.log('item edited')
}
//delete item
function deletItem(e) {
  // const element = e.currentTarget.parentElement.parentElement
  const {
    currentTarget: {
      parentElement: { parentElement: element },
    },
  } = e
  list.removeChild(element)
  if (list.children.length === 0) {
    container.classList.remove('show-container')
  }
  displayAlert('item removed', 'danger')
  setBackToDefault()
  removeFromLocalStorage(id)
}
//clear items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item')
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container')
  displayAlert('empty list', 'danger')
  // localStorage.removeItem("list")
  setBackToDefault()
}
//display alert

function displayAlert(text, action) {
  alert.textContent = text
  alert.classList.add(`alert-${action}`)

  //remove alert

  setTimeout(function () {
    alert.textContent = ''
    alert.classList.remove(`alert-${action}`)
  }, 1000)
}

function setBackToDefault() {
  console.log('set back to default')
  grocery.value = ''
  editFlag = false
  editID = ''
  // submitBtn.textContent = 'submit'
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {}
function addToLocalStorage(id) {}
// ****** SETUP ITEMS **********
