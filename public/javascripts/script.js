document.querySelector("#url-form").onsubmit = function (event) {
  event.preventDefault();

  let url = document.querySelector("#url-input").value;
  let shortenedUrl =
    "https://tinyurl.herokuapp.com/" +
    Math.random().toString(36).substring(2, 7);

  document.querySelector("#form-container").style.display = "none";
  document.querySelector("#result-container").style.display = "block";
  document.querySelector("#shortened-url").innerText = shortenedUrl;
};

document
  .querySelector("#copy-button")
  .addEventListener("click", copyToClipboard);

function copyToClipboard() {
  let shortenedUrl = document.querySelector("#shortened-url").innerText;
  navigator.clipboard.writeText(shortenedUrl).then(
    function () {
      alert("Copied to clipboard: " + shortenedUrl);
    },
    function (err) {
      alert("Error in copying text: " + err);
    }
  );
}

document.querySelector("#refresh-button").addEventListener("click", resetForm);
function resetForm() {
  document.querySelector("#result-container").style.display = "none";
  document.querySelector("#url-input").value = "";
  document.querySelector("#form-container").style.display = "block";
}
