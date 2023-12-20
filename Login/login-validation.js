const loginBtn = document.querySelector("#loginBtn");
const loginForm = document.querySelector(".login");
const loginInput = document.querySelector("#email");
const worningMessage = document.querySelector("#warningMessage");
const closeBtn = document.querySelector(".closeBtn");
const modal = document.querySelector(".modal");

loginBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

loginInput.addEventListener("input", () => {
  if (
    !loginInput.value.trim().includes("@redberry.ge") ||
    !(loginInput.value.trim().length > 13)
  ) {
    worningMessage.style.display = "flex";
    loginInput.style.marginBottom = "8px";
    loginInput.style.border = "1px solid #EA1919";
    loginInput.style.background = "#FAF2F3";
  } else {
    worningMessage.style.display = "none";
    loginInput.style.marginBottom = "24px";
    loginInput.style.border = "";
    loginInput.style.background = "";
  }
});
