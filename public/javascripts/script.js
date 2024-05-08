document.querySelector("#url-form").onsubmit = function (event) {
  event.preventDefault();
  submitUrl();
};

function submitUrl() {
  const urlToShorten = document.querySelector("#url-input").value;

  fetch("/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: urlToShorten }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.shortUrl) {
        displayShortenedUrl(data.shortUrl);
      } else {
        console.error("No shortened URL returned");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function displayShortenedUrl(url) {
  document.querySelector("#form-container").style.display = "none";
  document.querySelector("#result-container").style.display = "block";
  document.querySelector("#shortened-url").innerText = url;
}

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
