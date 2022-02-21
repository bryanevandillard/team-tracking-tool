// select elements

const addNoteFormEl = document.querySelector("#add-note-form");
const teamIdInputEl = document.querySelector("[name='teamId']");
const dateInputEl = document.querySelector("[name='date']");
const timeInputEl = document.querySelector("[name='time']");
const bodyInputEl = document.querySelector("[name='body']");
const submitBtnEl = document.querySelector("#save-note-btn");
const submitSpinner = createButtonSpinner(submitBtnEl);

// Initialization
// Set default values for date and time inputs using client's local time
const formatTime = (date) => {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
};
dateInputEl.valueAsDate = new Date();
timeInputEl.value = formatTime(new Date());

// give textarea focus
bodyInputEl.focus();
addNoteFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    dateInputEl.disabled = true;
    timeInputEl.disabled = true;
    bodyInputEl.disabled = true;
    submitSpinner.show("Saving note...");

    // create a iso date string from date and time inputs
    let date = dateInputEl.valueAsDate.getTime();
    date += timeInputEl.valueAsDate.getTime();
    date = new Date(date).toISOString();

    const note = {
      teamId: teamIdInputEl.value,
      createdAt: date,
      body: bodyInputEl.value.trim(),
    };

    const res = await fetch(`/api/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      location.replace(`/teams/${note.teamId}`)
    }
  } catch (error) {
    console.error(error);
  } finally {
    dateInputEl.disabled = false;
    timeInputEl.disabled = false;
    bodyInputEl.disabled = false;
    submitSpinner.hide();
  }
});
