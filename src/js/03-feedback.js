import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('form input');
const textareaEl = document.querySelector('form textarea');
const formDate = {};
const STORAGE_KEY = 'feedback';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  if (inputEl.value === '' || textareaEl.value === '') {
    return alert('Fields must be filled in');
  }

  localStorage.removeItem(STORAGE_KEY);

  event.currentTarget.reset();
}

function onFormInput(event) {
  const formValue = event.target.value;
  const formKay = event.target.name;

  formDate[formKay] = formValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDate));
}

function populateForm() {
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  try {
    if (savedForm.email) {
      inputEl.value = savedForm.email;
      formDate.email = savedForm.email;
    }

    if (savedForm.message) {
      textareaEl.value = savedForm.message;
      formDate.message = savedForm.message;
    }
  } catch (error) {
    console.log(error);
  }
}
