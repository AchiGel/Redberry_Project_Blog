const categoriesList = document.querySelector(".categoriesList");
const TOKEN =
  "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
const STORAGE_KEY = "categories";

async function loadCategories() {
  try {
    let categories = localStorage.getItem(STORAGE_KEY);

    if (categories) {
      categories = JSON.parse(categories);
    } else {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/categories",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const dataJson = await response.json();
      categories = dataJson.data;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }

    displayCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function createListItem(element) {
  const li = document.createElement("li");
  li.textContent = element.title;
  li.style.backgroundColor = element.background_color + "14";
  li.style.color = element.background_color;

  if (localStorage.getItem(`chosen_${element.title}`) === "true") {
    li.classList.add("chosenLi");
  }

  li.addEventListener("click", toggleChosen);
  return li;
}

function toggleChosen(e) {
  e.preventDefault();
  const li = e.target;
  li.classList.toggle("chosenLi");

  const categoryName = li.textContent;
  const isSelected = li.classList.contains("chosenLi");
  localStorage.setItem(`chosen_${categoryName}`, isSelected);

  // After selecting categories, filter blogs based on the chosen categories
  getBlogs();
}

function displayCategories(categories) {
  const fragment = document.createDocumentFragment();
  categories.forEach((element) => {
    const li = createListItem(element);
    fragment.appendChild(li);
  });
  categoriesList.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", loadCategories);
categoriesList.addEventListener("click", (e) => {
  if (e.target.tagName === "li") {
    toggleChosen(e);
  }
});
