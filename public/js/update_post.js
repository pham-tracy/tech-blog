// Update post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const contents = document.querySelector("#post-body").value.trim();

  // if (event.target.hasAttribute("data-id")) {
  const postID = event.target.getAttribute("data-id");

  const response = await fetch(`/api/post/${postID}`, {
    method: "PUT",
    body: JSON.stringify({ post_id: postID, title, contents }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log(response);
    document.location.replace("/dashboard");
  } else {
    alert("Failed to update post");
  }
};
// };

// Delete post
const delFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const postID = event.target.getAttribute("data-id");
    console.log(postID);
    const response = await fetch(`/api/post/${postID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".update-post-form")
  .addEventListener("submit", updateFormHandler);

document.querySelector(".deleteBtn").addEventListener("click", delFormHandler);
