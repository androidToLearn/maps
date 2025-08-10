document.getElementById("divQuate").style.display = "none";
document.getElementById("divProgress").style.display = "flex";
fetch("https://api.api-ninjas.com/v1/quotes", {
  headers: { "X-Api-Key": "PVRm8lJ+0sDfnhZg0kb01g==XMpVwUnx7BRPgLCM" },
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("p").innerText = data[0]["quote"];
    document.getElementById("divA").innerText = data[0]["author"];
    document.getElementById("divQuate").style.display = "flex";
    document.getElementById("divProgress").style.display = "none";
  });

document.getElementById("quatenew").addEventListener("click", () => {
  document.getElementById("divQuate").style.display = "none";
  document.getElementById("divProgress").style.display = "flex";
  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": "PVRm8lJ+0sDfnhZg0kb01g==XMpVwUnx7BRPgLCM" },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("p").innerText = data[0]["quote"];
      document.getElementById("divA").innerText = data[0]["author"];
      document.getElementById("divQuate").style.display = "flex";
      document.getElementById("divProgress").style.display = "none";
    });
});

let progress = 0;
setInterval(() => {
  progress++;
  document
    .getElementsByClassName("p")[0]
    .style.setProperty("--progress", progress);

  progress = progress % 100;
}, 30);

document.getElementById("twitter").addEventListener("click", () => {
  const textToSend = document.getElementById("p").value;
  let BraerToken =
    "AAAAAAAAAAAAAAAAAAAAABYU3QEAAAAAV4TxGO7Hu3MeeWBJCT66l1itXUw%3DMltVDvj58y03rmXqRtJZ5QnrzHtUu1emreNhVRhtARgFwojWzd";
  fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Access-Control-Request-Headers": "Authorization",

      Authorization: `Bearer ${BraerToken}`,
      "Content-Type": "application/json",
      /*grant_type: "oKWzwKKYB9niYmUx4tRJ5VTqd",*/
    },
    credentials: "include",

    body: JSON.stringify({
      text: "this is post from api in programming: " + textToSend,
    }),
  });
});
