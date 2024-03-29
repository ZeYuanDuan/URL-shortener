document.querySelector("#url-form").onsubmit = function (event) {
  event.preventDefault();

  let url = document.querySelector("#url-input").value;
  // Placeholder for URL shortening logic
  let shortenedUrl =
    "https://tinyurl.herokuapp.com/" +
    Math.random().toString(36).substring(2, 8);

  document.querySelector("#form-container").style.display = "none";
  document.querySelector("#result-container").style.display = "block";
  document.querySelector("#shortened-url").value = shortenedUrl;
};

function copyToClipboard() {
  let copyText = document.querySelector("#shortened-url");
  copyText.select();
  navigator.clipboard.writeText();
  alert("Copied to clipboard: " + copyText.value);
}
