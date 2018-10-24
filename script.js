let submitButton = document.querySelector("#submitComment");

submitComment.addEventListener("click", e => {
  e.preventDefault();
  let firstName = document.querySelector("#first_name").value;
  let lastName = document.querySelector("#last_name").value;
  let email = document.querySelector("#email").value;
  let comment = document.querySelector("#comment").value;
  saveComment(firstName, lastName, email, comment);
});

function saveComment(first, last, email, comment) {
  let userComment = {
    first: first,
    last: last,
    email: email,
    comment: comment
  };

  firebase
    .database()
    .ref("/comments")
    .push(userComment);
}

function getComments() {
  document.querySelector("#userComments").innerHTML = "";
  firebase
    .database()
    .ref("/comments")
    .on("value", snapshot => {
      let data = snapshot.val();
      for (key in data) {
        document.querySelector("#userComments").innerHTML += `
        <div class="row">
          <div class="col s12">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${data[key].first}</span>
                <p>${data[key].comment}</p>
              </div>
              <div class="card-action">
                <a href="#">${data[key].email}</a>
              </div>
            </div>
          </div>
        </div>
        `;
      }
    });
}

window.onload = getComments;
