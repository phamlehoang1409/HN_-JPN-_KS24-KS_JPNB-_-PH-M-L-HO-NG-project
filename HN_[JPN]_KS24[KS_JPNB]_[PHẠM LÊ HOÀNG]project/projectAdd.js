let accountData = localStorage.getItem("post");
let accounts = accountData ? JSON.parse(accountData) : []; // lấy dữ liệu từ localStorage

function addPost(event) {
    event.preventDefault(); // ngăn chặn hành vi mặc định của form

   
    let imgInput = document.getElementById("image"); 
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let mood = document.getElementById("mood").value;
    let content = document.getElementById("content").value;
    let statusRadios = document.getElementsByName("status");

    
    let postData = {
        img: imgInput.value,
        title: title,
        category: category,
        mood: mood,
        content: content,
        status: statusRadios,
    };  
    accounts.push(postData);// thêm acc vào mảng
    localStorage.setItem("post", JSON.stringify(accounts)); // chuyển accounts thành chuối trong mảng
    document.getElementById("postForm").reset(); // gọi id điền form và reset lại
    window.location.href = "./projectHome.html"; 
}

 window.onload = function() { // khi trang được tải
    categorySection();// gọi hàm để hiển thị danh mục
};
// hiển thị danh mục
function categorySection() {
    let select = document.getElementById("categorySection"); // lấy phần tử select từ HTML
    
    if (!select) { // kiểm tra xem phần tử có tồn tại không
        return;
    }

    let categories = JSON.parse(localStorage.getItem("topic")) || []; // lấy danh sách danh mục từ localStorage

    select.innerHTML = `<option value="">Chọn danh mục</option>`; // hiển thị danh sách để chọn
    
    let uniqueCategories = []; //
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
// thêm
function addPost(event) {
    event.preventDefault();

   
    let post = {
        img: document.getElementById("image").value,
        title: document.getElementById("title").value,
        category: document.getElementById("categorySection").value,
        mood: document.getElementById("mood").value,
        content: document.getElementById("content").value,
    };
    if(!post.img || !post.title || !post.category || !post.mood || !post.content) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }
    
    let posts = JSON.parse(localStorage.getItem("post" , "topic")) || [];
    posts.push(post);

  
    localStorage.setItem("post", JSON.stringify(posts));

    
    categorySection();
    document.getElementById("postForm").reset();
    window.location.href = "./projectHome.html"; 
}







