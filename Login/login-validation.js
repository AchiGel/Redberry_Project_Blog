const loginBtn = document.querySelector("#loginBtn");
const loginForm = document.querySelector(".login");
const formBtn = loginForm.querySelector("button");
const loginInput = document.querySelector("#email");
const worningMessage = document.querySelector("#warningMessage");
const closeBtn = document.querySelector(".closeBtn");
const modal = document.querySelector(".modal");

const successfulLogin = `<form>
      <img class="closeBtn" src="https://svgshare.com/getbyhash/sha1-PRNSwMCM+7R81r9dgj+3jiuCnRQ=" alt="" />
      <img style="margin-bottom:16px;" src="https://svgshare.com/getbyhash/sha1-lfe7SPACmJyBUAJJtxmkqY0U/7g=" alt="" />
      <h2 style="margin-bottom:48px;">წარმატებული ავტორიზაცია</h2>
      <button class="loginOk" type="submit">კარგი</button>
</form>`;

// --------------------------------------------------------- //

// Function to handle display of warning messages
function displayWarning() {
  worningMessage.style.display = "flex";
  loginInput.style.marginBottom = "8px";
  loginInput.style.border = "1px solid #EA1919";
  loginInput.style.background = "#FAF2F3";
}

// Function to reset input styling and hide warning
function resetInputStyling() {
  worningMessage.style.display = "none";
  loginInput.style.marginBottom = "24px";
  loginInput.style.border = "";
  loginInput.style.background = "";
}

// Function to handle successful login
function handleSuccessfulLogin() {
  loginForm.innerHTML = successfulLogin;
  loginBtn.innerText = "დაამატე ბლოგი";
}

loginForm.addEventListener("submit", async function checkUser(e) {
  try {
    e.preventDefault();
    const enteredEmail = loginInput.value;

    const token =
      "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";

    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: enteredEmail,
        }),
      }
    );

    if (!response.ok) {
      displayWarning();
    } else {
      handleSuccessfulLogin();
    }
  } catch (error) {
    console.log("Error occurred:", error);
    // Handle error here
  }
});

// Event delegation for modal close
document.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("closeBtn") ||
    event.target.classList.contains("loginOk")
  ) {
    modal.style.display = "none";
  }
});

loginInput.addEventListener("input", (e) => {
  e.preventDefault();
  if (
    !loginInput.value.trim().endsWith("@redberry.ge") ||
    !(loginInput.value.trim().length > 13)
  ) {
    displayWarning();
  } else {
    resetInputStyling();
  }
});

loginBtn.addEventListener("click", () => {
  if (loginBtn.innerText === "შესვლა") {
    modal.style.display = "block";
  } else if (loginBtn.innerText === "დაამატე ბლოგი") {
    window.location.href = "./Add_blog/add_blog.html";
  }
});
