const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');



const uppy = new Uppy.Core();

uppy.use(Uppy.Dashboard, {
  inline: true,
  target: '#image-upload',
});

uppy.use(Uppy.XHRUpload, {
  endpoint: '',
  fieldName: 'photo',
  formData: true,
});

uppy.on('complete', res => {
  location.reload();
});

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

modalContainer.addEventListener('click', hideModal);
modal.addEventListener('click', modalClick);
addBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);