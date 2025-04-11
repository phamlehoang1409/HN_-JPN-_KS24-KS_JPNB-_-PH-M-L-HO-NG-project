
let currentPage = 1;
const postsPerPage = 5;

function home() {
    window.location.href = "./projectHome.html";
}


function initializePosts() {
    let posts = JSON.parse(localStorage.getItem('post'));
    if (!Array.isArray(posts)) {
        posts = [];
        localStorage.setItem('post', JSON.stringify(posts));
    }
    return posts;
}

function renderPosts(page = 1) {
    let posts = initializePosts();
    currentPage = page;

    let startIndex = (page - 1) * postsPerPage;
    let endIndex = startIndex + postsPerPage;
    let paginatedPosts = posts.slice(startIndex, endIndex);

    let tbody = document.getElementById('postTableBody');
    if (!tbody) {
        return;
    }
    tbody.innerHTML = '';

    paginatedPosts.forEach((post, index) => {
        let status = (post.status || 'public').toString();
        let displayStatus = status.charAt(0).toUpperCase() + status.slice(1); // chat at để viết hoa chữ đầu 
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${post.img || ''}" alt="Ảnh bài viết" style="height: 100px;"></td>
            <td>${post.title || ''}</td>
            <td>${post.category || ''}</td>
            <td>${post.content || ''}</td>
            <td><span class="status ${status}">${displayStatus}</span></td>
            <td>
                <button class="edit-btn" data-index="${startIndex + index}">Sửa</button>
                <button class="delete-btn" data-index="${startIndex + index}">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    //xoá
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
                let posts = initializePosts();
                let index = parseInt(this.dataset.index);
                if (index >= 0 && index < posts.length) {
                    posts.splice(index, 1);
                    localStorage.setItem('post', JSON.stringify(posts));
                    renderPosts(currentPage);
                }
            }
        });
    });

    //sửa
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(this.dataset.index);
            let posts = initializePosts();
            let post = posts[index] || {};
            let row = this.closest('tr');
            row.innerHTML = `
                <td><input type="text" value="${post.img || ''}" name="image" style="width: 100px;"></td>
                <td><input type="text" value="${post.title || ''}" name="title" style="width: 150px;"></td>
                <td><input type="text" value="${post.category || ''}" name="category" style="width: 100px;"></td>
                <td><textarea name="content" rows="2" style="width: 200px;">${post.content || ''}</textarea></td>
                <td><select name="status" data-index="${index}" style="width: 100px;">
                    <option value="public" ${post.status === 'public' ? 'selected' : ''}>Public</option>
                    <option value="private" ${post.status === 'private' ? 'selected' : ''}>Private</option>
                </select></td>
                <td>
                    <button class="save-btn" data-index="${index}">Lưu</button>
                    <button class="cancel-btn">Hủy</button>
                </td>
            `;

            attachEditEventListeners();
        });
    });

    //lưu và hủy
    function attachEditEventListeners() {
        document.querySelectorAll('.save-btn').forEach(button => {
            button.addEventListener('click', function () {
                let index = parseInt(this.dataset.index);
                let row = this.closest('tr');
                let inputs = row.getElementsByTagName('input');
                let textarea = row.getElementsByTagName('textarea')[0];
                let select = row.getElementsByTagName('select')[0];
                let posts = initializePosts();

                if (index >= 0 && index < posts.length) {
                    posts[index] = {
                        img: inputs[0].value,
                        title: inputs[1].value,
                        category: inputs[2].value,
                        content: textarea.value,
                        status: select.value
                    };
                    localStorage.setItem('post', JSON.stringify(posts));
                    renderPosts(currentPage);
                }
            });
        });

        document.querySelectorAll('.cancel-btn').forEach(button => {
            button.addEventListener('click', function () {
                renderPosts(currentPage);
            });
        });
    }

    attachEditEventListeners();

    //phân trang
    setupPagination(posts, currentPage);
}

function setupPagination(posts, currentPage) {
    let totalPosts = posts.length;
    let totalPages = Math.ceil(totalPosts / postsPerPage);
    let pagination = document.getElementById('pagination');
    if (!pagination) {
        pagination = document.createElement('div');
        pagination.id = 'pagination';
        document.body.appendChild(pagination);
    }
    pagination.innerHTML = '';

    // nút quay lại
    if (currentPage > 1) {
        let prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            renderPosts(currentPage - 1);
        });
        pagination.appendChild(prevButton);
    }

    //số trang
    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.style.backgroundColor = '#ddd';
        }
        pageButton.addEventListener('click', () => {
            renderPosts(i);
        });
        pagination.appendChild(pageButton);
    }

    // nút next
    if (currentPage < totalPages) {
        let nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            renderPosts(currentPage + 1);
        });
        pagination.appendChild(nextButton);
    }
}

//thêm bài viết
document.getElementById('addArticleForm')?.addEventListener('submit', function (e) {
    e.preventDefault(); // chặn sự kiện submit mặc định
    let formData = new FormData(this);
    if (!formData.get('title') || !formData.get('image')) {
        alert('Điền đầy đủ tiêu đề và ảnh');
        return;
    }
    let posts = initializePosts();
    posts.push({
        img: formData.get('image'),
        title: formData.get('title'),
        category: formData.get('category') || '',
        content: formData.get('content') || '',
        status: formData.get('status') || 'public'
    });
    localStorage.setItem('post', JSON.stringify(posts)); // stringify để chuyển đổi thành chuỗi JSON
    this.reset();
    renderPosts(1); // quay lại trang 1 sau khi thêm
});

document.addEventListener('DOMContentLoaded', () => renderPosts(currentPage));