const formEl = document.querySelector("#add-member-form");
const nameInputEl = document.querySelector("input[name='name']");
const teamIdInputEl = document.querySelector("input[name='teamId']");
const submitBtnEl = document.querySelector("#add-member-form button");
const submitSpinner = createButtonSpinner(submitBtnEl);
const deleteMemberBtns = document.querySelectorAll(".delete-member");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const member = {
    teamId: teamIdInputEl.value,
    name: nameInputEl.value.trim(),
  };
  nameInputEl.disabled = true;
  submitBtnEl.disabled = true;
  submitSpinner.show(`Adding ${member.name}...`);

  try {
    const res = await fetch("/api/members", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(member),
    });
    if (res.ok) {
      return location.reload();
    }
    if (res.headers.get("content-type").includes("application/json")) {
      const error = await res.json();

      renderAlert(
        error.message || "Something unexpected went wrong. Please try again.",
        document.querySelector("#error-container")
      );
    }
  } catch (error) {
    console.error(error);
    nameInputEl.disabled = false;
    submitBtnEl.disabled = false;
    submitSpinner.hide();
  }
});

deleteMemberBtns.forEach((btnEl) => {
  btnEl.addEventListener("click", async () => {
    btnEl.disabled = true;
    try {
      const response = await fetch(`/api/members/${btnEl.value}`, {
        method: "DELETE",
      });
      if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.error(error);
      btnEl.disabled = false;
    }
  });
});
