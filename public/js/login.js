const renderAlert = (message, element) => {
  element.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
      <strong>Uh oh!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
document
  .querySelector(".login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = {
      email: document.querySelector("input[name='email']").value.trim(),
      password: document.querySelector("input[name='password']").value.trim(),
    };
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        return location.assign("/teams");
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
    }
  });
