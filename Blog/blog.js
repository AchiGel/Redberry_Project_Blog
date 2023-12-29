const blogMainSection = document.querySelector("main");
const sliderBtnBack = document.querySelector("#sliderBackBtn");
const sliderBtnForward = document.querySelector("#sliderForwardBtn");
const sliderBlogsContainer = document.querySelector(".blogs-container");

//------------------- create main blog element ---------------------------//
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

//------------------- create main blog element ---------------------------//

//------------------- fetchin exact blog by Id -----------------------------//

async function getExactBlog(id, categories) {
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
    const categoriesTitles = categories.map((item) => item.title);
    localStorage.setItem("mainBlogCategories", categoriesTitles);
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

//------------------- fetchin exact blog by Id -----------------------------//

//------------------- create blogs slider element ---------------------------//

function createBlogsSliderElement(
  image,
  author,
  date,
  title,
  categories,
  descr
) {
  const blogCard = document.createElement("div");
  blogCard.classList.add("blogPost");
  blogCard.innerHTML = `
        <img class="blog-photo" src="${image}" alt=""/>
        <h4>${author}</h4>
        <h6>${date}</h6>
        <h2>${title}</h2>
        <div class="blogs-categories"></div>
        <p>${descr}</p>
        <a href="">სრულად ნახვა<img class="arrowLogo" src="../assets/images/Arrow.png" alt=""/></a>
  `;

  const categoriesDiv = blogCard.querySelector(".blogs-categories");
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

  return blogCard;
}

//------------------- create blogs slider---------------------------//

async function createBlogsSlider(categories) {
  try {
    const token =
      "9a18c528c3e35ec5e8d3497d24f2cf5e9029a874227ebb98261fe1cb4bf32c58";
    const apiUrl = `https://api.blog.redberryinternship.ge/api/blogs`;
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
    const allBlogs = await responseJson.data;

    const filteredBlogs = allBlogs.filter((blog) => {
      const blogCategories = blog.categories.map((category) => category.title);
      return blogCategories.some((category) => categories.includes(category));
    });

    filteredBlogs.forEach((item) => {
      const singleBlog = item;
      const blogImage = singleBlog.image;
      const blogAuthor = singleBlog.author;
      const blogDate = singleBlog.publish_date;
      const blogTitle = singleBlog.title;
      const blogCategories = singleBlog.categories;
      const blogdescr = singleBlog.description.slice(0, 100);

      const exampleBlog = createBlogsSliderElement(
        blogImage,
        blogAuthor,
        blogDate,
        blogTitle,
        blogCategories,
        blogdescr
      );

      exampleBlog.id = singleBlog.id;

      sliderBlogsContainer.append(exampleBlog);
    });
  } catch (error) {
    console.log(error);
  }
}

//------------------- create blogs slider---------------------------//

//------------------- create blogs slider element ---------------------------//

window.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("clickedBlogId");
  const categories = localStorage.getItem("mainBlogCategories");

  getExactBlog(id, categories);
  createBlogsSlider(categories);
});
