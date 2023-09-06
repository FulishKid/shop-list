const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

//event listeners
// const tryIt = (e) => {
//   e.preventDefault();
//   console.log(e.target);
// };

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
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

    itemInput.value = '';
  } else alert('Field is empty');
}
function deleteItem(item) {
  console.log(item.target.className);
  if (item.target.className === 'remove-item btn-link text-red') {
    item.target.remove();
  }
}
