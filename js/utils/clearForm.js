//js/utils/clearForm.js

export function clearForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  } else {
    console.error(`Form with ID "${formId}" not found.`);
  }
}
