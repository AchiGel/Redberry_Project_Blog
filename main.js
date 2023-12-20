const categoriesList = document.querySelector(".categoriesList");

// ------------ Get categories from API ---------------//

async function getCategories() {
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
      throw new Error("Network response was not ok");
    }

    const dataJson = await response.json();

    const categories = await dataJson.data;

    for (let i = 0; i < categories.length; i++) {
      let categoryItem = await categories[i];
      let categoryNode = `<li style = "background-color: ${
        categoryItem.background_color + "14"
      }; color: ${categoryItem.background_color}">${categoryItem.title}</li>`;
      categoriesList.innerHTML += categoryNode;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

getCategories();

// ------------ Get categories from API ---------------//
