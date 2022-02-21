document.querySelectorAll("[data-ts]").forEach((dateTimeEl) => {
  const date = new Date(parseInt(dateTimeEl.dataset.ts, 10));
  dateTimeEl.textContent = date.toLocaleDateString();
});

async function handleDeleteTeamClick() {
  const id = this.value;
  try {
    this.disabled = true;
    await fetch(`/api/teams/${id}`, { method: "DELETE" });
    location.reload();
  } catch (error) {
    console.error(error);
  } finally {
    this.disabled = false;
  }
}

document
  .querySelectorAll(".delete-team")
  .forEach((btnEl) => btnEl.addEventListener("click", handleDeleteTeamClick));
