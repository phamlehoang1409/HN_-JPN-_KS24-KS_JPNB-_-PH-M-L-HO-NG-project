function home() {
    window.location.href = "./projectAdmin.html"; 
}

function entries() {
    window.location.href = "./projectScan.html"; 
}

function back() {
    window.location.href = "./projectLogin.html"; 
}
function article() {
    window.location.href = "./projectArticle.html"; 
    
}

let categories = JSON.parse(localStorage.getItem("post")) || [];


function displayCategories() {
    let tableBody = document.getElementById("categoryTableBody");
    tableBody.innerHTML = ""; // Xóa nội dung cũ

    categories.forEach((category, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${category.category || ''}</td>
           
            <td>
                <button class="action-btn edit-btn" onclick="editCategory(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteCategory(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row); // gắn thêm 1 phấn tử
    });

    // lưu lô cồ
    localStorage.setItem("post", JSON.stringify(categories));
}

// thêm
function addCategory() {
    let categoryInput = document.getElementById("categoryInput").value.trim();
    if (categoryInput) {
        categories.push({ category: categoryInput});
        document.getElementById("categoryInput").value = ""; 
        displayCategories();
    } else {
        alert("Vui long nhap ten danh muc");
    }
}

// Chỉnh sửa 
function editCategory(index) {
    let newCategory = prompt("Nhập tên danh mục mới:", categories[index].category);
    if (newCategory && newCategory.trim()) {
        categories[index].category = newCategory.trim();
        displayCategories();
    }
}

// Xóa 
function deleteCategory(index) {
    if (confirm("Bạn có muốn xoá không")) {
        categories.splice(index, 1);
        displayCategories();
    }
}

// Hiển thị danh sách khi trang load
window.onload = displayCategories;

function addCategory() {
    let categoryInput = document.getElementById("categoryInput").value.trim();
    if (categoryInput) {
        let newCategory = {
            id: Date.now(),
            category: categoryInput
        };
        categories.push(newCategory);
        document.getElementById("categoryInput").value = ""; 
        displayCategories();
    } else {
        alert("Vui lòng nhập tên danh mục");
    }
}


function editCategory(index) {
    let newCategory = prompt("Nhập tên danh mục mới:", categories[index].category);
    if (newCategory && newCategory.trim()) {
        categories[index].category = newCategory.trim();
        displayCategories();
    }
}
