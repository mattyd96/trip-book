// DOM elements
const deleteBtn = document.querySelectorAll('.delete-btn');
const addBtn = document.querySelector('.add-btn');
const addSubmitBtn = document.querySelector('.add-submit-btn');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

// Links to kanban and gallery
const kanbanLink = document.querySelector('.kanban-link');
const galleryLink = document.querySelector('.gallery-link');

// remove a user from trip
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

// add user to trip
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

//------------------------------------ Link functions ---------------------------//
const gotoKanban = () => {
  location.assign(`${location.pathname}/kanban`);
}

const gotoGallery = () => {
  location.assign(`${location.pathname}/gallery`);
}

//------------------------------------- modal functions -------------------------//
// show modal
const addUserModal = () => {
  modalContainer.classList.remove('hidden');
}

// hide modal
const hideModal = event => {
  event.preventDefault();
  modalContainer.classList.add('hidden');
}

// stop click on modal from bubbling to hideModal
const preventBubble = event => {
  event.stopPropagation();
}


// event listeners
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