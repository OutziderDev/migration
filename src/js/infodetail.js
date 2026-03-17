document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log(url);
  console.log("dato", id);
  const idSpan = document.querySelector("#id");
  idSpan.textContent = id;
});
