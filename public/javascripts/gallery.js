const uppy = new Uppy.Core();
console.log(location.url);

uppy.use(Uppy.Dashboard, {
  inline: true,
  target: '#image-upload',
});

uppy.use(Uppy.XHRUpload, {
  endpoint: '',
  fieldName: 'photo',
  formData: true,
});