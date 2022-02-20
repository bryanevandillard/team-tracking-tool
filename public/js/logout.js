document.querySelector(".btn-logout")?.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/users/logout", { method: "POST" });
    if (res.ok) {
      location.assign("/login");
    }
  } catch (error) {
    console.error(error);
  }
});
