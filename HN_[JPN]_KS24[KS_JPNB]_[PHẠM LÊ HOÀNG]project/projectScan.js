function home() {
    window.location.href = "./projectAdmin.html"; 
}

function entries() {
    window.location.href = "./projectScan.html"; 
}

function back() {
    if(confirm("bạn chắc muốn đăng xuất không?")){
        window.location.href="./projectLogin.html";
    }
}

function article() {
    window.location.href = "./projectArticle.html"; 
}

let categories = JSON.parse(localStorage.getItem("topic", "post")) || [];

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
        tableBody.appendChild(row); // Gắn thêm một phần tử
    });

    // Lưu lại localStorage
    localStorage.setItem("topic", JSON.stringify(categories));
}

// Thêm 
function addCategory() {
    let categoryInput = document.getElementById("categoryInput").value.trim();
    if (categoryInput) {
        // Kiểm tra xem tên đã tồn tại chưa
        const isDuplicate = categories.some(category => category.category.toLowerCase() === categoryInput.toLowerCase());
        if (isDuplicate) {
            alert("Chủ đề đã tồn tại");
        } else {
            let newCategory = {
                id: Date.now(),
                category: categoryInput
            };
            categories.push(newCategory);
            document.getElementById("categoryInput").value = ""; 
            displayCategories();
        }
    } else {
        alert("Vui lòng nhập tên danh mục");
    }
}

// Chỉnh sửa
function editCategory(index) {
    let newCategory = prompt("Nhập tên danh mục mới:", categories[index].category);
    if (newCategory && newCategory.trim()) {
        // Kiểm tra xem tên mới có trùng với bất kỳ tên nào khác không
        const isDuplicate = categories.some((category, i) => // kiểm tra trùng lặp
            i !== index && category.category.toLowerCase() === newCategory.trim().toLowerCase()
        );
        if (isDuplicate) {
            alert("Tên danh mục đã tồn tại");
        } else {
            categories[index].category = newCategory.trim();
            displayCategories();
        }
    }
}

// Xóa
function deleteCategory(index) {
    if (confirm("Bạn có muốn xóa không")) {
        categories.splice(index, 1);
        displayCategories();
    }
}

// Hiển thị danh sách khi trang load
window.onload = displayCategories;
