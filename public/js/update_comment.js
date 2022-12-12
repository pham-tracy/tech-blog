// Update post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector("#comment-body").value.trim();

  // if (event.target.hasAttribute("data-id")) {
  //   const postID = event.target.getAttribute("data-id");
  const postID = document.querySelector(".postID").getAttribute("data-id");

  const commentID = document
    .querySelector(".updateCommentBtn")
    .getAttribute("data-id");

  console.log(commentID);
  console.log(postID);
  const response = await fetch(`/api/comments/${commentID}`, {
    method: "PUT",
    body: JSON.stringify({ comment_id: commentID, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log(response);
    console.log(postID);
    document.location.replace(`/post/${postID}`);
  } else {
    alert("Failed to update comment");
  }
};
// };

// Delete post
const delFormHandler = async (event) => {
  event.preventDefault();

  const postID = document.querySelector(".postID").getAttribute("data-id");

  if (event.target.hasAttribute("data-id")) {
    const commentID = event.target.getAttribute("data-id");
    console.log(commentID);
    const response = await fetch(`/api/comments/${commentID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace(`/post/${postID}`);
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".updateCommentBtn")
  .addEventListener("click", updateFormHandler);

document
  .querySelector(".deleteCommentBtn")
  .addEventListener("click", delFormHandler);
