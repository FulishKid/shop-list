const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const filter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEdit = false;

function startApp() {
  itemForm.addEventListener('submit', onItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clear.addEventListener('click', deleteAllItems);
  filter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage);
  checkForItemList();
  inputFocus();
}
function onItemSubmit(event) {
  event.preventDefault();
  const inputValue = itemInput.value;

  if (!inputValue) {
    alert('Field is empty');
    return;
  }

  if (isEdit) {
    handleEdit(inputValue);
  } else {
    handleAdd(inputValue);
  }
}

function handleEdit(inputValue) {
  const editedItem = document.querySelector('.list-edit');
  const itemsFromStorage = getItemFromLocalStorage();
  const indexOfItem = itemsFromStorage.indexOf(editedItem.textContent);

  if (ifItemExist(inputValue) && inputValue !== editedItem.textContent) {
    alert('This item already exists!');
    return;
  }

  itemsFromStorage[indexOfItem] = inputValue;
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  loadItemsFromLocalStorage();
  exitEditMode();
}

function handleAdd(inputValue) {
  if (ifItemExist(inputValue)) {
    alert('This item already exists!');
    return;
  }
  addItemToDOM(inputValue);
  addItemToLocalStorage(inputValue);
  checkForItemList();
  itemInput.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const btn = document.createElement('button');
  btn.className = 'remove-item btn-link text-red';

  const i = document.createElement('i');
  i.className = 'fa-solid fa-xmark';

  btn.appendChild(i);
  li.appendChild(btn);
  itemList.appendChild(li);
}
function getItemFromLocalStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
function addItemToLocalStorage(item) {
  const itemsFromStorage = getItemFromLocalStorage();

  // add to itemsFromStorage an item
  itemsFromStorage.push(item);
  //add to local storage an item
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function loadItemsFromLocalStorage() {
  const items = getItemFromLocalStorage();
  items.forEach((item) => addItemToDOM(item));
  checkForItemList();
}
function onClickItem(e) {
  deleteItem(e);
  if (e.target.tagName === 'LI') {
    if (e.target.classList.contains('list-edit')) {
      exitEditMode();
    } else {
      isEdit = true;
      itemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('list-edit'));
      e.target.classList.add('list-edit');
      formBtn.innerHTML = '<i class ="fa-solid fa-pen"></i> Update item';
      formBtn.classList.add('btn-edit');
      itemInput.value = e.target.textContent;
    }
  }
}

function deleteItem(el) {
  //removing from the DOM
  if (el.target.parentElement.tagName === 'BUTTON') {
    const item = el.target.parentElement.parentElement;
    item.remove();
    // removing from local storage
    const itemsFromStorage = getItemFromLocalStorage();
    const indexOfItem = itemsFromStorage.indexOf(item.textContent);
    itemsFromStorage.splice(indexOfItem, 1);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

    checkForItemList();
  }
}
function deleteAllItems() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  localStorage.removeItem('items');
  checkForItemList();
}
function checkForItemList() {
  itemInput.value = '';
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.classList.remove('btn-edit');
  if (isEdit) {
    // const itemOnEdit = document.querySelector('.list-edit');
    // ifItemExist.classList.remove('list-edit');
  }

  if (!itemList.firstElementChild) {
    filter.style.display = 'none';
    clear.style.display = 'none';
  } else {
    filter.style.display = 'block';
    clear.style.display = 'block';
  }
}
function filterItems(el) {
  const items = itemList.querySelectorAll('li');
  const text = el.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else item.style.display = 'none';
  });
}
function ifItemExist(item) {
  return getItemFromLocalStorage().includes(item);
}
function inputFocus() {
  itemInput.addEventListener(
    'focus',
    (e) => (e.target.style.border = '1px solid green')
  );
  itemInput.addEventListener(
    'blur',
    (e) => (e.target.style.border = '1px solid #ccc')
  );
}
function exitEditMode() {
  const editedItem = document.querySelector('.list-edit');
  if (editedItem) {
    editedItem.classList.remove('list-edit');
  }
  checkForItemList();
  isEdit = false;
}

startApp();
