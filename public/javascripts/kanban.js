const addModalBtn = document.querySelector('.add-item');           // button for opening modal to add item
const modalContainer = document.querySelector('.modal-container'); // modal container
const modal = document.querySelector('.modal');                    // modal
const cancelBtn = document.querySelector('.cancel-btn');           // cancel item add button
const addBtn = document.querySelector('.add-btn');                 // add item button
const deleteBtn = document.querySelectorAll('.delete-btn');        // delete an item buttons
const textArea = document.querySelector('#content');               // text area for item content to be added



//--------------------------- Draggable API -------------------------------------//
const sortable = new Draggable.Sortable(document.querySelectorAll('.items'), {
  draggable: '.item',
  mirror: {
    constrainDimensions: true,
  },
  distance: 5,
});

// POST new location of sorted item
const sortPost = event => {
  const itemId = event.data.dragEvent.data.source.id;
  const newIndex = event.newIndex;
  const oldIndex = event.oldIndex;

  const oldC = event.oldContainer.parentElement.classList[1];
  const newC = event.newContainer.parentElement.classList[1];

  console.log(oldC);
  console.log(newC);
  console.log(event.oldIndex);

  // TODO : get the post route for this functionality
  fetch('', {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({itemId, newIndex, oldIndex, oldC, newC})
  })
  .then((response) => { 
    if(response.ok) {
      location.reload();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

// listenter for when sort is ended on user drag
sortable.on('sortable:stop', sortPost);


//---------------------------- Modal functions -----------------------------------//

// show modal
const showModal = event => {
  event.preventDefault();
  modalContainer.classList.remove('hidden');
}

// hide modal
const hideModal = event => {
  event.preventDefault();
  modalContainer.classList.add('hidden');
}

// helper function to stop any clicks on modal from closing it
const modalClick = event => {
  event.stopPropagation();
}

// cancel adding an item
const cancelAdd = event => {
  event.preventDefault();
  textArea.value = '';
  modalContainer.classList.add('hidden');
}


//--------------------------- CRUD operations -------------------------------------//

// POST add an item
const addItem = event => {
  const content = textArea.value;
  const index = document.querySelectorAll('.c1 .item').length;
  const body = {content, index}

  // TODO : get the post route for this functionality
  fetch('', {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify(body)
  })
  .then((response) => {
    if(response.ok) {
      location.reload();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

// DELETE an item
const deleteItem = event => {
  console.log("delete pressed");
  const target = event.target.value;
  
  fetch('', {
    method: 'DELETE',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({target})
  })
  .then((response) => {
    if(response.ok) {
      location.reload();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}


// event listeners
addModalBtn.addEventListener('click', showModal);
modalContainer.addEventListener('click', hideModal);
modal.addEventListener('click', modalClick);
cancelBtn.addEventListener('click', cancelAdd);
addBtn.addEventListener('click', addItem);

deleteBtn.forEach(btn => {
  btn.addEventListener('click', deleteItem);
});