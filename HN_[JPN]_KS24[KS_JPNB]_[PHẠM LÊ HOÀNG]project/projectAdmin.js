function back(){
    if(confirm("bạn chắc muốn đăng xuất không?")){
        window.location.href="./projectLogin.html";
    }
}
function entries(){
    window.location.href = "./projectScan.html";
}
function users(){
    window.location.href="./projectHome.html";
}
function home() {
    window.location.href="./projectAdmin.html";
}
function articles(){
    window.location.href="./projectArticle.html";
}

const USERS_PER_PAGE = 5;
let currentPage = 1;

// tải và hiển thị người dùng với phân trang
function loadUsers() {
    let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
    let totalPages = Math.ceil(accounts.length / USERS_PER_PAGE); // tổng số trang

    let startIndex = (currentPage - 1) * USERS_PER_PAGE;
    let endIndex = startIndex + USERS_PER_PAGE;
    let paginatedUsers = accounts.slice(startIndex, endIndex);

    let tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    paginatedUsers.forEach(user => {
        let row = document.createElement('tr'); // tạo một hàng mới
        row.innerHTML = `
            <td>${user.gmaildangki || 'No Email'}</td>
            <td>${user.matkhaudangki || 'No Password'}</td>
            <td><button class="action-btn" onclick="editUser('${user.gmaildangki}')">Edit</button> <button class="action-btn" onclick="deleteUser('${user.gmaildangki}')">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('total-users').textContent = `(${accounts.length} users) - Trang ${currentPage} / ${totalPages}`;
}

// xóa người dùng
function deleteUser(email) {
    if (confirm(`Bạn có chắc muốn xóa người dùng : ${email}`)) {
        let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
        accounts = accounts.filter(user => user.gmaildangki !== email);
        localStorage.setItem('accout', JSON.stringify(accounts)); // lưu lại danh sách người dùng đã xóa 
        currentPage = 1; // reset về trang 1 sau khi xóa
        loadUsers();
    }
}

// tìm kiếm
document.getElementById('searchInput').addEventListener('input', function(e) {
    let searchTerm = e.target.value.toLowerCase(); // chuyển đổi thành chữ thường 
    let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
    let filteredUsers = accounts.filter(user => 
        (user.gmaildangki && user.gmaildangki.toLowerCase().includes(searchTerm)) || 
        (user.matkhaudangki && user.matkhaudangki.toLowerCase().includes(searchTerm)) // tìm kiếm theo tên hoặc mật khẩu
    );

    currentPage = 1; // reset về trang 1 khi tìm kiếm
    let totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE); // tổng số trang
    let startIndex = (currentPage - 1) * USERS_PER_PAGE; // bắt đầu từ trang 1
    let endIndex = startIndex + USERS_PER_PAGE; // kết thúc ở trang 1
    let paginatedUsers = filteredUsers.slice(startIndex, endIndex); // phân trang người dùng đã lọc

    let tbody = document.getElementById('user-table-body'); 
    tbody.innerHTML = '';

    paginatedUsers.forEach(user => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.gmaildangki || 'No Email'}</td>
            <td>${user.matkhaudangki || 'No Password'}</td>
            <td><button class="action-btn" onclick="editUser('${user.gmaildangki}')">Edit</button> <button class="action-btn" onclick="deleteUser('${user.gmaildangki}')">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('total-users').textContent = `(${filteredUsers.length} users) - Trang ${currentPage} / ${totalPages}`;
});

//điều hướng trang
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadUsers();
    }
}
// chuyển trang
function nextPage() {
    let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
    const totalPages = Math.ceil(accounts.length / USERS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        loadUsers();
    }
}

// phân trang
document.querySelector('.pagination button:first-child').addEventListener('click', prevPage); // previous
document.querySelector('.pagination button:last-child').addEventListener('click', nextPage); // next

//tải khi trang được mở
window.onload = loadUsers;



function sortUsers() {
    let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
    accounts.sort((a, b) => a.gmaildangki.localeCompare(b.gmaildangki));
    currentPage = 1; // reset về trang 1 khi sắp xếp
    loadUsers();
}

