const blogsArea = document.querySelector("#blogsArea");
const blogCategory = document.querySelectorAll(".blogs-categories");
const categories = document.querySelector(".categoriesList");
const listItem = categories.children;

async function getBlogs() {
  try {
    const token =
      "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/blogs",
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
    const blogs = await dataJson.data;

    blogs.map((items) => {
      let categoriesListForBlog = document.createElement("ul");
      categoriesListForBlog.classList.add("categoriesList");
      categoriesListForBlog.classList.add("categoriesListForBlog");
      for (let cat of items.categories) {
        let category = document.createElement("li");
        category.textContent = cat.title;
        category.style.color = cat.background_color;
        category.style.backgroundColor = cat.background_color + "14";
        categoriesListForBlog.appendChild(category);
      }

      const blogPost = document.createElement("div");
      blogPost.classList.add("blogPost");
      let blogInner = `<img class="blog-photo" src="${items.image}" alt="" />
          <h4>${items.author}</h4>
          <h6>${items.publish_date}</h6>
          <h2>${items.title}</h2>
          <div class="blogs-categories"></div>
          <p>
            ${items.description}
          </p>
          <a href=""
            >სრულად ნახვა
            <img class="arrowLogo" src="./assets/images/Arrow.png" alt=""
          /></a>`;
      blogPost.innerHTML = blogInner;
      let categoriesContainer = blogPost.querySelector(".blogs-categories");
      categoriesContainer.appendChild(categoriesListForBlog);
      blogsArea.append(blogPost);
    });
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", getBlogs());
