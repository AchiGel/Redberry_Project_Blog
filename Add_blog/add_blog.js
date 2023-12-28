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
const postCategoriesSelected = document.querySelector("#categoriesSelected");
const postEmail = document.querySelector("#email-upload");
const postEmailWarning = document.querySelector(".upload-email span");
const postSubmit = document.querySelector("#upload-submit");

//-----------Modal Buttons---------------//
const addBlogModal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".add_blog_modal_closeBtn");
const modalBackToHomeBtn = document.querySelector(".add_blog_modal_Ok");

//-----------Modal Buttons---------------//

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
    let categoriesOptions = document.createElement("label");
    let categorielOptionsInput = document.createElement("input");
    categorielOptionsInput.type = "checkbox";
    categoriesOptions.textContent = element.title;
    categorielOptionsInput.value = element.title;
    categorielOptionsInput.id = element.id;
    categoriesOptions.style.backgroundColor = element.background_color;
    categoriesOptions.appendChild(categorielOptionsInput);
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
  const checkboxes = document.querySelectorAll(
    '#categories input[type="checkbox"]:checked'
  );

  if (checkboxes.length === 0) {
    postCategoriesSelected.style.border = "1px solid #EA1919";
    postCategoriesSelected.style.background = "#FAF2F3";
    return false;
  } else {
    postCategoriesSelected.style.border = "1px solid #14D81C";
    postCategoriesSelected.style.background = "#F8FFF8";
    return true;
  }
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

//------------------------------------------------------------//

const token =
  "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
const apiUrl = "https://api.blog.redberryinternship.ge/api/blogs";

function categoriesToSubmit() {
  let arr = [];
  for (let cat of postcategories.selectedOptions) {
    arr.push(cat.id);
  }

  return arr;
}

function showModal() {
  addBlogModal.style.display = "block";

  modalCloseBtn.addEventListener("click", closeModal);

  modalBackToHomeBtn.addEventListener("click", backToHomePage);
}

function closeModal() {
  addBlogModal.style.display = "none"; //
}

function backToHomePage() {
  window.location.href = "../index.html";
}

postBlogForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const isFormValid =
    validateAuthor() &&
    validateTitle() &&
    validateDescr() &&
    validateDate() &&
    validateCategories();

  if (isFormValid) {
    try {
      postSubmit.style.background = "#4721DD";
      postSubmit.style.cursor = "pointer";

      const formData = new FormData();
      formData.append("title", postTitle.value);
      formData.append("description", postDescr.value);
      formData.append("author", postAuthor.value);
      formData.append("publish_date", postdate.value);
      formData.append("categories", JSON.stringify(categoriesToSubmit()));
      formData.append("email", postEmail.value);
      formData.append("image", postImage.files[0]);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log(response);
      if (response.ok) {
        showModal();
      } else {
        console.log("Form submission failed.");
      }
    } catch (error) {
      console.log("Error submitting the form:", error);
    }
  } else {
    postSubmit.style.background = "";
    postSubmit.style.cursor = "";
    console.log("Form validation failed.");
  }
});

//-------------------------------------------------------//

function dropDown() {
  const dropdownSelected = document.querySelector(".dropdown-selected");
  const dropdownOptions = document.querySelector(".dropdown-options");
  const checkboxes = document.querySelectorAll(
    ".dropdown-options input[type='checkbox']"
  );

  function toggleOptionsDisplay() {
    dropdownOptions.classList.toggle("dropdown-options-block");
  }

  dropdownSelected.addEventListener("click", toggleOptionsDisplay);

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
      const selectedOptions = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => {
          const optionText = cb.parentElement.textContent
            .trim()
            .replace("×", "")
            .trim();
          return `<span class="selected-option" data-value="${cb.value}">${optionText}<span class="close-icon" data-value="${cb.value}">&times;</span></span>`;
        });

      dropdownSelected.innerHTML =
        selectedOptions.join(" ") || "Choose your options";

      if (!checkbox.checked) {
        const selectedOption = dropdownSelected.querySelector(
          `[data-value="${checkbox.value}"]`
        );
        if (selectedOption) {
          selectedOption.remove();
        }
      }
    });
  });

  dropdownSelected.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-icon")) {
      const value = event.target.dataset.value;
      const checkbox = document.querySelector(
        `.dropdown-options input[value="${value}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
        event.target.parentElement.remove();
      }
    }
    if (dropdownSelected.innerText === "") {
      dropdownSelected.textContent = "Choose your options";
    }
  });
}

dropDown();
