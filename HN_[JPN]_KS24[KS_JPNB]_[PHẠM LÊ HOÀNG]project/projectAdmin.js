function back(){
    window.location.href="./projectLogin.html";
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

function loadUsers() {
    let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
    
    document.getElementById('total-users').textContent = `(${accounts.length} users)`;
    let tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    accounts.forEach(user => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.gmaildangki || 'No Email'}</td>
            <td>${user.matkhaudangki || 'No Password'}</td>
            <td><button class="action-btn" onclick="editUser('${user.gmaildangki}')">Edit</button> <button class="action-btn" onclick="deleteUser('${user.gmaildangki}')">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    let searchTerm = e.target.value.toLowerCase();
    let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
    let filteredUsers = accounts.filter(user => 
        (user.gmaildangki && user.gmaildangki.toLowerCase().includes(searchTerm)) || 
        (user.status && user.status.toLowerCase().includes(searchTerm))
    );

    let tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    filteredUsers.forEach(user => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.gmaildangki || 'No Email'}</td>
            <td>${user.matkhaudangki || 'No Password'}</td>
            <td><button class="action-btn" onclick="editUser('${user.gmaildangki}')">Edit</button> <button class="action-btn" onclick="deleteUser('${user.gmaildangki}')">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
});

function deleteUser(email) {
    if (confirm(`Bạn có chắc muốn xóa người dùng với email: ${email}`)) {
        let accounts = JSON.parse(localStorage.getItem('accout') || '[]');
        accounts = accounts.filter(user => user.gmaildangki !== email);
        localStorage.setItem('accout', JSON.stringify(accounts));
        loadUsers(); 
    }
}


window.onload = loadUsers;

