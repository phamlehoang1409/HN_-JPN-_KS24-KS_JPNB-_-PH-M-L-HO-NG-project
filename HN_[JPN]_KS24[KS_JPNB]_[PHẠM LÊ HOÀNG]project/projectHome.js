let navigateTo = (url) => window.location.href = url;

function next() {
    window.location.href = "./projectAdd.html";
}

function logOut() {
    window.location.href = "./project.html";
}

let posts = JSON.parse(localStorage.getItem("post")) || [];

if (!localStorage.getItem("post")) {
    localStorage.setItem("post", JSON.stringify(posts));
}

let postsPerPage = 5;
let currentPage = 1;
let selectedCategory = "all";
let searchQuery = ""; // lưu từ khóa tìm kiếm

function createPostHTML(post, isGrid = true) {
    let template = isGrid ? `
        <article class="post" onclick="mo('${post.img}')">
            <div class="post-item">
                <img src="${post.img}" alt="Post Image">
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p class="pot">${post.content.substring(0, 100)}...</p>
                    <span class="category">${post.category}</span>
                </div>
            </div>
        </article>
    ` : `
        <div class="item1">
            <img src="${post.img}" alt="">
            <div class="line">
                <h3><b>${post.title}</b></h3>
            </div>
            <p class="contentInMain">${post.content}</p>
            <button>${post.category}</button>
        </div>
    `;
    return template;
}

function mo(imgURL) {
    let posts = JSON.parse(localStorage.getItem("post")) || [];

    // tìm bài post theo ảnh
    let baichitiet = posts.find(post => post.img === imgURL);
    if (!baichitiet) {
        console.log("Không tìm thấy bài viết với ảnh này");
        return;
    }

    // lưu bài post chi tiết vào localStorage
    localStorage.setItem("baichitiet", JSON.stringify(baichitiet));

    window.location.href = "projectDetais.html";
}

function filterPostsByCategory(category) {
    selectedCategory = category;
    searchQuery = ""; // reset tìm kiếm
    currentPage = 1;
    displayPosts();
    let topicItems = document.getElementsByClassName("topic-item");
    for (let item of topicItems) {
        item.classList.remove("active");
    }
    event.target.classList.add("active");
    hideOtherCategories();
}

function searchPosts() {
    let searchInput = document.querySelector('.search-bar input').value.trim().toLowerCase();
    searchQuery = searchInput;
    selectedCategory = "all"; // reset tìm kiếm theo category
    currentPage = 1;
    displayPosts();
    hideOtherCategories();
}

function hideOtherCategories() {
    let allPosts = document.querySelectorAll('.post, .item1');
    allPosts.forEach(post => {
        let postCategory = post.querySelector('.category, button').textContent.toLowerCase();
        let shouldShow = false;

        if (selectedCategory === "all" && searchQuery === "") {
            shouldShow = true; // hiển thị tất cả nếu không lọc
        } else if (selectedCategory !== "all" && postCategory === selectedCategory.toLowerCase()) {
            shouldShow = true; // hiển thị theo category
        } else if (searchQuery !== "" && postCategory.includes(searchQuery)) {
            shouldShow = true; // hiển thị theo tìm kiếm trong category
        }

        post.style.display = shouldShow ? 'block' : 'none';
    });
}

function displayPosts(page = currentPage) {
    let postGrid = document.getElementsByClassName("post-grid")[0];
    let content2 = document.getElementsByClassName("content2")[0];
    
    if (!postGrid || !content2) return;

    postGrid.innerHTML = "";
    content2.innerHTML = "";

    let filteredPosts = selectedCategory === "all" 
        ? posts 
        : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

    // lọc theo từ khóa tìm kiếm trong category
    if (searchQuery !== "") {
        filteredPosts = filteredPosts.filter(post => 
            post.category.toLowerCase().includes(searchQuery)
        );
    }

    let start = (page - 1) * postsPerPage;
    let end = start + postsPerPage;
    let paginatedPosts = filteredPosts.slice(start, end);

    if (filteredPosts.length === 0) {
        postGrid.innerHTML = "<p>No posts found.</p>";
        content2.innerHTML = "<p>No posts found.</p>";
    } else {
        paginatedPosts.forEach(post => {
            postGrid.innerHTML += createPostHTML(post, true);
            content2.innerHTML += createPostHTML(post, false);
        });
    }

    updatePagination(filteredPosts);
    hideOtherCategories(); // ẩn các bài không khớp
}

function updatePagination(filteredPosts = posts) {
    let totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    let paginationNumbers = document.getElementById("paginationNumbers");
    if (!paginationNumbers) return;

    paginationNumbers.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let p = document.createElement("p");
        p.textContent = i;
        p.onclick = () => {
            currentPage = i;
            displayPosts(currentPage);
        };
        if (i === currentPage) p.classList.add("active");
        paginationNumbers.appendChild(p);
    }
}

function nextPage() {
    let filteredPosts = selectedCategory === "all" 
        ? posts 
        : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
    if (searchQuery !== "") {
        filteredPosts = filteredPosts.filter(post => 
            post.category.toLowerCase().includes(searchQuery)
        );
    }
    let totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPosts(currentPage);
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPosts(currentPage);
    }
}

// thanh tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
    let searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', searchPosts);
});

window.onload = () => {
    displayPosts();
};