// DOM components
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');

//-------------------------- uppy functions ---------------------------//
// uppy object
const uppy = new Uppy.Core();

// create uppy widget
uppy.use(Uppy.Dashboard, {
  inline: true,
  target: '#image-upload',
});

// xhr upload of photo to backend
uppy.use(Uppy.XHRUpload, {
  endpoint: '',
  fieldName: 'photo',
  formData: true,
});

// on upload complete -> reload page
uppy.on('complete', res => {
  location.reload();
});

//---------------------------------- modal functions ------------------//
// show modal
const showModal = event => {
  event.preventDefault();
  modalContainer.classList.remove('hidden');
}

// hide modal
const hideModal = event => {
  modalContainer.classList.add('hidden');
}

// helper function to stop any clicks on modal from closing it
const modalClick = event => {
  event.stopPropagation();
}

// listeners
modalContainer.addEventListener('click', hideModal);
modal.addEventListener('click', modalClick);
addBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);