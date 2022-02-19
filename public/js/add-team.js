const titleInput = document.querySelector("input[name='title']");
const submitBtn = document.querySelector(".add-team-form button");
const addTeamForm = document.querySelector(".add-team-form");
const submitBtnSpinner = createButtonSpinner(submitBtn);

// Example starter JavaScript for disabling form submissions if there are invalid fields
addTeamForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const team = {
    title: document.querySelector("input[name='title']").value.trim(),
  };

  titleInput.disabled = true;
  submitBtn.disabled = true;

  submitBtnSpinner.show(`Creating ${team.title}...`);

  try {
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(team),
    });
    if (res.ok) {
      const { team } = await res.json();
      return location.assign(`/teams/${team.id}/members`);
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
    titleInput.disabled = false;
    submitBtn.disabled = false;
    submitBtnSpinner.hide();
  }
});
