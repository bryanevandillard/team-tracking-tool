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
