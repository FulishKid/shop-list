const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const filter = document.getElementById('filter');

//event listeners
// const tryIt = (e) => {
//   e.preventDefault();
//   console.log(e.target);
// };

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
clear.addEventListener('click', deleteAllItems);
checkForItemList();
function addItem(item) {
  item.preventDefault();

  if (itemInput.value) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(itemInput.value));

    const btn = document.createElement('button');
    btn.className = 'remove-item btn-link text-red';

    const i = document.createElement('i');
    i.className = 'fa-solid fa-xmark';

    btn.appendChild(i);
    li.appendChild(btn);
    itemList.appendChild(li);
    checkForItemList();
    itemInput.value = '';
  } else alert('Field is empty');
}

/**
 *  @param {EventListenerOrEventListenerObject} el
 */
function deleteItem(el) {
  if (el.target.parentElement.tagName === 'BUTTON') {
    el.target.parentElement.parentElement.remove();
  }
  if (!itemList.firstChild) {
    checkForItemList();
  }
}
function deleteAllItems(el) {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkForItemList();
}
function checkForItemList() {
  if (!itemList.firstChild) {
    filter.style.display = 'none';
    clear.style.display = 'none';
  } else {
    filter.style.display = 'block';
    clear.style.display = 'block';
  }
}
