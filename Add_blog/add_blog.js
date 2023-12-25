const postBlogForm = document.querySelector("#postBlogForm");
const postImage = document.querySelector("#image");
const postAuthor = document.querySelector("#author");
const postAuthorWarning = document.querySelectorAll(".upload-author ul li");
const postTitle = document.querySelector("#title");
const postTitleWarning = document.querySelector(".upload-title span");
const postDescr = document.querySelector("#description");
const postDescrWarning = document.querySelector(".blog-body-upload span");
const postdate = document.querySelector("#date");
const postcategories = document.querySelector("#categories");
const postEmail = document.querySelector("#email-upload");
const postEmailWarning = document.querySelector(".upload-email span");
const postSubmit = document.querySelector("#upload-submit");

async function loadCategories() {
  try {
    const token =
      "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/categories",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const dataJson = await response.json();
    const categories = await dataJson.data;
    displayCategories(categories);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

loadCategories();

function displayCategories(categories) {
  categories.forEach((element) => {
    let categoriesOptions = document.createElement("option");
    categoriesOptions.textContent = element.title;
    categoriesOptions.value = element.title;
    categoriesOptions.id = element.id;
    categoriesOptions.style.backgroundColor = element.background_color;
    postcategories.appendChild(categoriesOptions);
  });
}

function validateAuthor() {
  const authorValue = postAuthor.value.trim();

  const isLengthValid = authorValue.length >= 4;

  const wordCount = authorValue
    .split(/\s+/)
    .filter((word) => word !== "").length;
  const isWordCountValid = wordCount >= 2;

  const isGeorgian = /^[\u10A0-\u10FF\s]+$/u.test(authorValue);

  if (!isLengthValid) {
    postAuthorWarning[0].style.color = "#EA1919";
    postAuthor.style.border = "1px solid #EA1919";
    postAuthor.style.background = "#FAF2F3";
    return false;
  } else if (isLengthValid) {
    postAuthorWarning[0].style.color = "#14D81C";
    postAuthor.style.border = "1px solid #14D81C";
    postAuthor.style.background = "#F8FFF8";
  }
  if (!isWordCountValid) {
    postAuthorWarning[1].style.color = "#EA1919";
    postAuthor.style.border = "1px solid #EA1919";
    postAuthor.style.background = "#FAF2F3";
    return false;
  } else if (isWordCountValid) {
    postAuthorWarning[1].style.color = "#14D81C";
    postAuthor.style.border = "1px solid #14D81C";
    postAuthor.style.background = "#F8FFF8";
  }
  if (!isGeorgian) {
    postAuthorWarning[2].style.color = "#EA1919";
    postAuthor.style.border = "1px solid #EA1919";
    postAuthor.style.background = "#FAF2F3";
    return false;
  } else if (isGeorgian) {
    postAuthorWarning[2].style.color = "#14D81C";
    postAuthor.style.border = "1px solid #14D81C";
    postAuthor.style.background = "#F8FFF8";
  }

  return true;
}

function validateTitle() {
  const titleValue = postTitle.value.trim();
  const isTitleValid = titleValue.length >= 2;
  if (!isTitleValid) {
    postTitleWarning.style.color = "#EA1919";
    postTitle.style.border = "1px solid #EA1919";
    postTitle.style.background = "#FAF2F3";
    return false;
  } else if (isTitleValid) {
    postTitleWarning.style.color = "#14D81C";
    postTitle.style.border = "1px solid #14D81C";
    postTitle.style.background = "#F8FFF8";
  }
  return true;
}

function validateDescr() {
  const descrValue = postDescr.value.trim();
  const isDescrValid = descrValue.length >= 2;
  if (!isDescrValid) {
    postDescrWarning.style.color = "#EA1919";
    postDescr.style.border = "1px solid #EA1919";
    postDescr.style.background = "#FAF2F3";
    return false;
  } else if (isDescrValid) {
    postDescrWarning.style.color = "#14D81C";
    postDescr.style.border = "1px solid #14D81C";
    postDescr.style.background = "#F8FFF8";
  }
  return true;
}

function validateDate() {
  const dateValue = postdate.value;
  if (!dateValue) {
    postdate.style.border = "1px solid #EA1919";
    postdate.style.background = "#FAF2F3";
    return false;
  } else if (dateValue !== "") {
    postdate.style.border = "1px solid #14D81C";
    postdate.style.background = "#F8FFF8";
  }
  return true;
}

function validateCategories() {
  const categoriesValue = postcategories.value;
  if (categoriesValue === "" || postcategories.selectedOptions.length === 0) {
    postcategories.style.border = "1px solid #EA1919";
    postcategories.style.background = "#FAF2F3";
    return false;
  } else if (categoriesValue !== "") {
    postcategories.style.border = "1px solid #14D81C";
    postcategories.style.background = "#F8FFF8";
  }
  return true;
}

function validateEmail() {
  const emailValue = postEmail.value.trim();
  const isEmailValid = emailValue.endsWith("@redberry.ge");
  if (!isEmailValid) {
    postEmailWarning.classList.add("spanActive");
    postEmail.style.border = "1px solid #EA1919";
    postEmail.style.background = "#FAF2F3";
    return false;
  } else if (isEmailValid) {
    postEmailWarning.classList.remove("spanActive");
    postEmail.style.border = "1px solid #14D81C";
    postEmail.style.background = "#F8FFF8";
  }
  return true;
}

postAuthor.addEventListener("input", validateAuthor);

postTitle.addEventListener("input", validateTitle);

postDescr.addEventListener("input", validateDescr);

postdate.addEventListener("input", validateDate);

postcategories.addEventListener("change", validateCategories);

postEmail.addEventListener("input", validateEmail);

//-------------------------------------------------------------//

postBlogForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const isFormValid =
    validateAuthor() &&
    validateTitle() &&
    validateDescr() &&
    validateDate() &&
    validateCategories();

  if (isFormValid) {
    postSubmit.style.background = "#4721DD";
    postSubmit.style.cursor = "pointer";

    try {
      const token =
        "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
      const apiUrl = "https://api.blog.redberryinternship.ge/api/blogs";

      let X = [];

      for (let i = 0; i < postcategories.selectedOptions.length; i++) {
        X.push(postcategories.selectedOptions[i].id);
      }

      const formData = new FormData(this);

      const data = {
        author: formData.get("author"),
        title: formData.get("title"),
        description: formData.get("description"),
        publish_date: formData.get("publish_date"),
        categories: X,
        image: formData.get("image"),
      };

      console.log(data);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    console.error("Form validation failed.");
  }
});
