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

    //lưu local
    localStorage.setItem("topic", JSON.stringify(categories));
}

// thêm
function addCategory() {
    let categoryInput = document.getElementById("categoryInput").value.trim();
    if (categoryInput) {
        // kiểm tra xem tồn tại hay chưa
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

// khỉnh sửa
function editCategory(index) {
    let newCategory = prompt("Nhập tên danh mục mới:", categories[index].category);
    if (newCategory && newCategory.trim()) {
        // kiểm tra xem tên mới có trùng với bất kỳ tên nào khác không
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

// xóa
function deleteCategory(index) {
    if (confirm("Bạn có muốn xóa không")) {
        categories.splice(index, 1);
        displayCategories();
    }
}

// hiển thị danh sách khi trang load
window.onload = displayCategories;
