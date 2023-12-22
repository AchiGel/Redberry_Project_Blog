const categoriesList = document.querySelector(".categoriesList");
const listItems = categoriesList.children;

async function loadCategories() {
  try {
    let categories = JSON.parse(localStorage.getItem("categories"));
    if (!categories) {
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
      categories = dataJson.data;

      localStorage.setItem("categories", JSON.stringify(categories));
    }

    displayCategories(categories);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function displayCategories(categories) {
  categories.forEach((element) => {
    let li = document.createElement("li");
    li.textContent = element.title;
    li.style.backgroundColor = element.background_color + "14";
    li.style.color = element.background_color;

    if (localStorage.getItem(`chosen_${element.title}`) === "true") {
      li.classList.add("chosenLi");
    }

    categoriesList.appendChild(li);

    li.addEventListener("click", (e) => {
      e.preventDefault();
      li.classList.toggle("chosenLi");

      localStorage.setItem(
        `chosen_${element.title}`,
        li.classList.contains("chosenLi")
      );
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});
