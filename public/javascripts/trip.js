const deleteBtn = document.querySelectorAll('.delete-btn');
const addBtn = document.querySelector('.add-btn');
const addSubmitBtn = document.querySelector('.add-submit-btn');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

const kanbanLink = document.querySelector('.kanban-link');
const galleryLink = document.querySelector('.gallery-link');

const removeUser = event => {
  event.preventDefault();

  const user = event.target.id;

  const url = location.pathname + '/remove';

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

const addUser = event => {
  event.preventDefault();
  const errDiv = document.querySelector('.error-msg');
  const url = location.pathname + '/add';
  const user = document.querySelector('#user-entry');

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user: user.value})
  })
  .then(response => {
    if (response.ok) {
      user.value = '';
      errDiv.classList.add('hidden');
      location.reload();
    } else {
      errDiv.classList.remove('hidden');
    }
  })
  .catch(err => {
    console.log(err);
  });
}

const gotoKanban = () => {
  location.assign(`${location.pathname}/kanban`);
}

const gotoGallery = () => {
  location.assign(`${location.pathname}/gallery`);
}

addBtn.addEventListener('click', addUserModal);
addSubmitBtn.addEventListener('click', addUser);
modal.addEventListener('click', preventBubble);
modalContainer.addEventListener('click', hideModal);

kanbanLink.addEventListener('click', gotoKanban);
galleryLink.addEventListener('click', gotoGallery);

if(deleteBtn) {
  deleteBtn.forEach(btn => {
    btn.addEventListener('click', removeUser);
  })
}