
let accountData = localStorage.getItem("post");
let accounts = accountData ? JSON.parse(accountData) : [];

function addPost(event) {
    event.preventDefault();

   
    let imgInput = document.getElementById("image");
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let mood = document.getElementById("mood").value;
    let content = document.getElementById("content").value;
    let statusRadios = document.getElementsByName("status");

    if(imgInput.value.length == 0){
        alert("Bạn chưa nhập ảnh");
        return;
    }
    
    let postData = {
        img: imgInput.value,
        title: title,
        category: category,
        mood: mood,
        content: content,
        status: statusRadios,
    };  
    accounts.push(postData);
    localStorage.setItem("post", JSON.stringify(accounts));
    document.getElementById("postForm").reset();
    window.location.href = "./projectHome.html"; 
}

 window.onload = function() {
    categorySection();
};

function categorySection() {
    let select = document.getElementById("categorySection");
    
    if (!select) {
        return;
    }

    
    let categories = JSON.parse(localStorage.getItem("post")) || [];

    
    select.innerHTML = `<option value="">Chọn danh mục</option>`;

    
    let uniqueCategories = [];
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i]?.category;
        if (category && uniqueCategories.indexOf(category) === -1) {
            uniqueCategories.push(category);
        }
    }

    for (let i = 0; i < uniqueCategories.length; i++) {
        select.innerHTML += `<option value="${uniqueCategories[i]}">${uniqueCategories[i]}</option>`;
    }
}

function addPost(event) {
    event.preventDefault();

   
    const post = {
        img: document.getElementById("image").value,
        title: document.getElementById("title").value,
        category: document.getElementById("categorySection").value,
        mood: document.getElementById("mood").value,
        content: document.getElementById("content").value,
        status: document.querySelector('input[name="status"]:checked').value
    };

    let posts = JSON.parse(localStorage.getItem("post")) || [];
    posts.push(post);

  
    localStorage.setItem("post", JSON.stringify(posts));

    
    categorySection();
    document.getElementById("postForm").reset();
    window.location.href = "./projectHome.html"; 
}







