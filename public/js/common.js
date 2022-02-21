// eslint-disable-next-line no-unused-vars
const renderAlert = (message, element) => {
  element.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
      <strong>Uh oh!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
};

// eslint-disable-next-line no-unused-vars
const createButtonSpinner = (btnElement) => {
  const innerHTML = btnElement.innerHTML;
  return {
    show(message = "Loading...", disabled = true) {
      btnElement.disabled = disabled;
      btnElement.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${message}`;
    },
    hide(disabled = false) {
      btnElement.disabled = disabled;
      btnElement.innerHTML = innerHTML;
    },
  };
};
