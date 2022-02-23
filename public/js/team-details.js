// Display formatted dates for all notes
document.querySelectorAll("[data-ts]").forEach((dateTimeEl) => {
  const date = new Date(parseInt(dateTimeEl.dataset.ts, 10));
  dateTimeEl.textContent = date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });
});

// Handle the edit title form
const pageHeaderEl = document.querySelector("#page-header");
const editTitleFormEl = document.querySelector("#edit-title-form");
const editTitleBtn = document.querySelector("#edit-title-btn");
const cancelEditTitleBtn = document.querySelector("#cancel-edit-title-btn");
const saveTitleBtn = document.querySelector("#save-title-btn");
const titleInputEl = document.querySelector("[name='title']");
const teamIdInputEl = document.querySelector("[name='teamId']");
const spinner = createButtonSpinner(saveTitleBtn);

// Show the edit title form
editTitleBtn.addEventListener("click", () => {
  pageHeaderEl.classList.add("d-none");
  editTitleFormEl.classList.remove("d-none");
  titleInputEl.select();
});

// Hide the edit title form
cancelEditTitleBtn.addEventListener("click", () => {
  pageHeaderEl.classList.remove("d-none");
  editTitleFormEl.classList.add("d-none");
});

editTitleFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    spinner.show();
    titleInputEl.disabled = true;
    const body = { title: titleInputEl.value.trim() };
    const res = await fetch(`/api/teams/${teamIdInputEl.value}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  } finally {
    titleInputEl.disabled = false;
    spinner.hide();
  }
});

// handle delete note confirmation
const confirmDeleteBtn = document.querySelector("#confirm-delete-note-btn");
const confirmDeleteSpinner = createButtonSpinner(confirmDeleteBtn);
const confirmModalEl = document.getElementById("confirmModal");

// update the modal when a delete button is clicked
confirmModalEl.addEventListener("show.bs.modal", function (event) {
  confirmDeleteBtn.value = event.relatedTarget.value;
});

// Handles sending a request to delete a note when the confirm delete button in
// the confirm modal is clicked.
async function handleConfirmDeleteClick() {
  const modalDismissBtnList =
    confirmModalEl.querySelectorAll("[data-bs-dismiss]");
  const modalBodyEl = confirmModalEl.querySelector(".modal-body");

  try {
    // put modal elements into a loading state
    confirmDeleteSpinner.show();
    modalDismissBtnList.forEach((element) => {
      element.disabled = true;
    });
    modalBodyEl.textContent = "Deleting note...";

    // send delete request
    const noteId = this.value;
    const res = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });

    if (res.ok) {
      // reload page after hide modal animation completes
      confirmModalEl.addEventListener("hidden.bs.modal", () =>
        location.reload()
      );
      bootstrap.Modal.getInstance(confirmModalEl).hide();
      return;
    }
    const { message } = await res.json();
    throw new Error(message);
  } catch (error) {
    console.error(error);
    // end loading state on modal and show message
    modalBodyEl.textContent = error.message;
    confirmDeleteSpinner.hide();
    modalDismissBtnList.forEach((element) => {
      element.disabled = false;
    });
  }
}

confirmDeleteBtn.addEventListener("click", handleConfirmDeleteClick);
