const deleteBtn = document.querySelector('.delete-btn');
const addBtn = document.querySelector('.add-btn');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

const removeUser = event => {
  event.preventDefault();

  const user = event.target.id;

  const url = location.pathname + 'remove';

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user})
  })
  .then(response => {
    if(response.ok) {
      location.reload();
    }
  })
  .catch(err => {
    console.log(err);
  });
}

const addUserModal = () => {
  modalContainer.classList.remove('hidden');
}

const hideModal = event => {
  event.preventDefault();
  modalContainer.classList.add('hidden');
}

const preventBubble = event => {
  event.stopPropagation();
}

addBtn.addEventListener('click', addUserModal);
modal.addEventListener('click', preventBubble);
modalContainer.addEventListener('click', hideModal);