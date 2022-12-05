const commentFormHandler = async (event) => {
  event.preventDefault();

  // Comment form
  const comment_contents = document.querySelector("#comment").value.trim();

  if (comment_contents) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment_contents }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler);
