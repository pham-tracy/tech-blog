// Create post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const contents = document.querySelector("#post-body").value.trim();

  if (title && contents) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".updateBtn")
  .addEventListener("click", updateFormHandler);

document.querySelector(".deleteBtn").addEventListener("click", delFormHandler);

// document
//   .querySelector("#updateBtn")
//   .addEventListener("click", showUpdateForm());

// function showUpdateForm() {
//   document.querySelector("updateForm").style.display = "block";
// }
