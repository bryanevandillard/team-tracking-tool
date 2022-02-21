document.querySelectorAll("[data-ts]").forEach((dateTimeEl) => {
  const date = new Date(parseInt(dateTimeEl.dataset.ts, 10));
  dateTimeEl.textContent = date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  });
});
