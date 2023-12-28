const blogMainSection = document.querySelector("main");

function createBlogElement(image, author, date, title, categories, article) {
  const blogBody = document.createElement("section");
  blogBody.classList.add("blog-section");
  blogBody.innerHTML = `
    <img class="blog-bg" src="${image}" alt="" />
    <h4 class="blog-author">${author}</h4>
    <h6 class="blog-date">${date}</h6>
    <h2 class="blog-title">${title}</h2>
    <div class="blogs-categories"></div>
    <article class="blog-article">${article}</article>
  `;

  const categoriesDiv = blogBody.querySelector(".blogs-categories");
  const categoriesList = document.createElement("ul");
  categoriesList.classList.add("categories-list");

  categories.forEach((category) => {
    const categoryItem = document.createElement("li");
    categoryItem.textContent = category.title;
    categoryItem.style.color = category.background_color;
    categoryItem.style.backgroundColor = category.background_color + "14";
    categoriesList.appendChild(categoryItem);
  });

  categoriesDiv.appendChild(categoriesList);

  return blogBody;
}

async function getExactBlog(id) {
  try {
    const token =
      "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
    const apiUrl = `https://api.blog.redberryinternship.ge/api/blogs/${id}`;
    const response = await fetch(apiUrl, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const responseJson = await response.json();
    const image = responseJson.image;
    const author = responseJson.author;
    const date = responseJson.publish_date;
    const title = responseJson.title;
    const categories = responseJson.categories;
    const article = responseJson.description;

    const blogElement = createBlogElement(
      image,
      author,
      date,
      title,
      categories,
      article
    );

    blogMainSection.appendChild(blogElement);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("clickedBlogId");
  getExactBlog(id);
});
