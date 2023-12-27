const blogsArea = document.querySelector("#blogsArea");
const categories = document.querySelector(".categoriesList");

async function getBlogs() {
  try {
    const allBlogs = await fetchBlogsFromAPI();
    const selectedCategories = getSelectedCategoriesFromLocalStorage();

    let filteredBlogs = filterBlogsByCategories(allBlogs, selectedCategories);

    // Clear existing blogs before displaying new ones
    clearBlogs();

    displayBlogs(filteredBlogs);
  } catch (error) {
    handleGetBlogsError(error);
  }
}

function clearBlogs() {
  // Remove all existing blogs from the DOM
  blogsArea.innerHTML = "";
}

async function fetchBlogsFromAPI() {
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
  return dataJson.data;
}

function getSelectedCategoriesFromLocalStorage() {
  const localStorageKeys = Object.keys(localStorage);
  const chosenCategories = localStorageKeys.filter((key) =>
    key.startsWith("chosen_")
  );
  return chosenCategories
    .filter((key) => localStorage.getItem(key) === "true")
    .map((key) => key.replace("chosen_", ""));
}

function filterBlogsByCategories(allBlogs, selectedCategories) {
  if (selectedCategories.length === 0) {
    return allBlogs; // Return all blogs if no categories are selected
  }

  return allBlogs.filter((blog) =>
    selectedCategories.every((selectedCategory) =>
      blog.categories.some(
        (blogCategory) => selectedCategory === blogCategory.title
      )
    )
  );
}

function displayBlogs(blogs) {
  blogs.forEach((blog) => {
    const categoriesListForBlog = createCategoriesListForBlog(blog.categories);
    const blogTextContent = blog.description.slice(0, 100) + "...";
    const blogPost = createBlogPostElement(
      blog,
      categoriesListForBlog,
      blogTextContent
    );
    blogsArea.appendChild(blogPost);
  });
}

function createCategoriesListForBlog(categories) {
  const categoriesListForBlog = document.createElement("ul");
  categoriesListForBlog.classList.add("categoriesListForBlog");

  categories.forEach((cat) => {
    const category = document.createElement("li");
    category.textContent = cat.title;
    category.style.color = cat.background_color;
    category.style.backgroundColor = cat.background_color + "14";
    category.style.listStyle = "none";
    category.style.fontSize = "12px";
    category.style.padding = "6px 10px";
    category.style.borderRadius = "30px";
    categoriesListForBlog.appendChild(category);
  });

  return categoriesListForBlog;
}

function createBlogPostElement(blog, categoriesListForBlog, blogText) {
  const blogPost = document.createElement("div");
  blogPost.classList.add("blogPost");

  blogPost.innerHTML = `
    <img class="blog-photo" src="${blog.image}" alt="" />
    <h4>${blog.author}</h4>
    <h6>${blog.publish_date}</h6>
    <h2>${blog.title}</h2>
    <div class="blogs-categories"></div>
    <p class="blogs-text"></p>
    <a href="#" class="viewFullBlog">სრულად ნახვა<img class="arrowLogo" src="./assets/images/Arrow.png" alt="" /></a>
  `;

  const categoriesContainer = blogPost.querySelector(".blogs-categories");
  categoriesContainer.appendChild(categoriesListForBlog);

  const blogsText = blogPost.querySelector(".blogs-text");
  blogsText.textContent = blogText;

  const viewFullBlog = blogPost.querySelector(".viewFullBlog");
  viewFullBlog.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "./Blog/blog.html";
  });

  return blogPost;
}

function handleGetBlogsError(error) {
  console.error(error);
  // Additional error handling logic if needed
}

// Example: Trigger getBlogs when categories change
categories.addEventListener("change", getBlogs);

window.addEventListener("DOMContentLoaded", () => {
  getBlogs();
});
