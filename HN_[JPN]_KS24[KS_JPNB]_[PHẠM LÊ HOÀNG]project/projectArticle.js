
let currentPage = 1; // trang hiện tại
const postsPerPage = 5; // số lượng bài viết trên mỗi trang

function home() {
    window.location.href = "./projectHome.html";
}

//lấy danh sách chủ đề từ local
function getTopics() {
    let topics = JSON.parse(localStorage.getItem('topic')); // gọi topic
    if (!Array.isArray(topics)) { // kiểm tra mảng
        topics = []; // Nếu không phải mảng, khởi tạo mảng rỗng
        localStorage.setItem('topic', JSON.stringify(topics)); // thêm vào loacl
    }
    return topics; // trả về danh dách
}

//khởi tạo danh sách bài viết
function initializePosts() { 
    let posts = JSON.parse(localStorage.getItem('post')) || []; // gọi topic
    if (!Array.isArray(posts)) { // kiểm tra mảng
        posts = []; //  khởi tạo mảng rỗng
        localStorage.setItem('post', JSON.stringify(posts)); // thêm vào loacl
    }
    return posts; // trả về danh dách
}

//render bài viết
function renderPosts(page = 1) { // trang mặc định là 1
    let posts = initializePosts(); // gọi bài viết
    currentPage = page; // cập nhật trang hiện tại

    let startIndex = (page - 1) * postsPerPage; // tính số lượng bài viết bắt đầu
    let endIndex = startIndex + postsPerPage; // tính số lượng bài viết kết thúc
    let paginatedPosts = posts.slice(startIndex, endIndex); // lấy bài viết theo trang

    let tbody = document.getElementById('postTableBody'); // gọi id body html
    if (!tbody) { // kiểm tra id body có tồn tại không
        return; // nếu không có thì dừng lại
    }
    tbody.innerHTML = ''; // xóa nội dung cũ

    paginatedPosts.forEach((post, index) => { // duyệt qua từng bài viết
        let status = (post.status || 'public').toString(); // trạng thái bài viết
        let displayStatus = status.charAt(0).toUpperCase() + status.slice(1); // viết hoa chữ đầu tiên
        let row = document.createElement('tr'); // thêm phần tử tr mưới
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
        `; // thêm nội dung vào phần tử tr
        tbody.appendChild(row); // thêm phần tử tr vào tbody
    });

    document.querySelectorAll('.delete-btn').forEach(button => { // gọi tất cả nút xóa
        button.addEventListener('click', function () { // // thêm sk cho nút xóa
            if (confirm('Bạn có chắc muốn xóa bài viết này?')) { 
                let posts = initializePosts(); // gọi bài viết
                let index = parseInt(this.dataset.index); // lấy chỉ số bài viết
                if (index >= 0 && index < posts.length) { // kiểm tra chỉ số bài viết có hợp lệ không
                    posts.splice(index, 1);// xóa bài viết
                    localStorage.setItem('post', JSON.stringify(posts));//lưu bài viết đã xoá
                    renderPosts(currentPage); // reload bài viết
                }
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach(button => { // // gọi tất cả nút sửa
        button.addEventListener('click', function () { // thêm sk cho nút sửa
            let index = parseInt(this.dataset.index); // lấy chỉ số bài viết
            let posts = initializePosts(); // gọi bài viết
            let post = posts[index] || {}; // lấy bài viết theo chỉ số
            let topics = getTopics(); // gọi danh sách chủ đề
            let row = this.closest('tr'); // tìm hàng char của nút sửa
            row.innerHTML = `
                <td><input type="text" value="${post.img || ''}" name="image" style="width: 100px;"></td>
                <td><input type="text" value="${post.title || ''}" name="title" style="width: 150px;"></td>
                <td>
                    <select name="category" style="width: 100px;">
                        ${topics.map(topic => `<option value="${topic}" ${post.category === topic ? 'selected' : ''}>${topic}</option>`).join('')}
                    </select>
                </td>
                <td><textarea name="content" rows="2" style="width: 200px;">${post.content || ''}</textarea></td>
                <td><select name="status" data-index="${index}" style="width: 100px;">
                    <option value="public" ${post.status === 'public' ? 'selected' : ''}>Public</option>
                    <option value="private" ${post.status === 'private' ? 'selected' : ''}>Private</option>
                </select></td>
                <td>
                    <button class="save-btn" data-index="${index}">Lưu</button>
                    <button class="cancel-btn">Hủy</button>
                </td>
            `; // thêm nội dung vào phần tử tr

            attachEditEventListeners(); // gọi hàm lueu và huỷ
        });
    });

    function attachEditEventListeners() {  //thêm sự kiện cho nút lưu và hủy
        document.querySelectorAll('.save-btn').forEach(button => { // // gọi tất cả nút lưu
            button.addEventListener('click', function () { // thêm sk cho nút lưu
                let index = parseInt(this.dataset.index); // lấy chỉ số bài viết
                let row = this.closest('tr'); // tìm hàng char của nút lưu
                let inputs = row.getElementsByTagName('input'); // lấy tất cả input trong hàng
                let textareas = row.getElementsByTagName('textarea');      // lấy tất cả textarea trong hàng
                let selects = row.getElementsByTagName('select');// // lấy tất cả select trong hàng
                let posts = initializePosts(); // gọi bài viết

                if (index >= 0 && index < posts.length) { // kiểm tra chỉ số bài viết có hợp lệ không
                    posts[index] = { // // cập nhật bài viết
                        img: inputs[0].value,  // lấy giá trị ảnh
                        title: inputs[1].value, // lấy giá trị tiêu đề
                        category: selects[0].value, // lấy giá trị chuyên mục
                        content: textareas[0].value, // lấy giá trị nội dung
                        status: selects[1].value // // lấy giá trị trạng thái
                    };
                    localStorage.setItem('post', JSON.stringify(posts)); // thêm vào loacl
                    renderPosts(currentPage); //reoload bài viết
                }
            });
        });

        document.querySelectorAll('.cancel-btn').forEach(button => { // // gọi tất cả nút hủy
            button.addEventListener('click', function () { // // thêm sk cho nút hủy
                renderPosts(currentPage); // // reload bài viết
            });
        });
    }

    attachEditEventListeners(); // gọi hàm lueu và huỷ

    setupPagination(posts, currentPage); // phân trang
}

// phân trang
function setupPagination(posts, currentPage) { // phân trang
    let totalPosts = posts.length; // độ dài bài viết
    let totalPages = Math.ceil(totalPosts / postsPerPage); // tổng số trang
    let pagination = document.getElementById('pagination'); // gọi id phân trang
    if (!pagination) { // kiểm tra id phân trang có tồn tại không
        pagination = document.createElement('div');// // tạo phần tử div mới
        pagination.id = 'pagination';// // thêm id cho phần tử div
        document.body.appendChild(pagination); // // thêm phần tử div vào body
    }
    pagination.innerHTML = ''; // xóa nội dung cũ

    if (currentPage > 1) { // // nếu trang hiện tại lớn hơn 1
        let prevButton = document.createElement('button'); // // tạo nút trước
        prevButton.textContent = 'Previous'; // // thêm nội dung cho nút trước
        prevButton.addEventListener('click', () => { // // thêm sk cho nút trước
            renderPosts(currentPage - 1); // // // reload bài viết
        });
        pagination.appendChild(prevButton); // // thêm nút trước vào phân trang
    }

    for (let i = 1; i <= totalPages; i++) { // // duyệt qua từng trang
        let pageButton = document.createElement('button'); // // tạo nút trang
        pageButton.textContent = i; // // thêm nội dung cho nút trang
        if (i === currentPage) { // // nếu trang hiện tại bằng trang đang duyệt
            pageButton.style.backgroundColor = '#ddd'; 
        }
        pageButton.addEventListener('click', () => { // // thêm sk cho nút trang
            renderPosts(i); // // // reload bài viết
        });
        pagination.appendChild(pageButton); // // thêm nút trang vào phân trang
    }

    if (currentPage < totalPages) { 
        let nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            renderPosts(currentPage + 1);
        });
        pagination.appendChild(nextButton);
    }
}

// Hiển thị và điền form khi nhấn nút thêm bviet
document.getElementById('openFormBtn')?.addEventListener('click', function () {
    let topics = getTopics(); // gọi danh sách chủ đề
    let categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.innerHTML = '';
        if (topics && Array.isArray(topics) && topics.length > 0) {
            topics.forEach(topic => {
                if (typeof topic === 'object') {
                    let option = document.createElement('option');
                    option.value = topic.category;
                    option.textContent = topic.category;
                    categorySelect.appendChild(option);
                }
            });
        } else {
            let option = document.createElement('option');
            option.value = '';
            option.textContent = 'Không có chuyên mục';
            categorySelect.appendChild(option);
        }
        document.getElementById('addArticleForm').style.display = 'block';
    }
});

// Ẩn form khi nhấn nút "Hủy"
document.getElementById('closeFormBtn')?.addEventListener('click', function () {
    document.getElementById('addArticleForm').style.display = 'none';
});

// Thêm bài viết
document.querySelector('#addArticleForm form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    if (!formData.get('title') || !formData.get('image')) {
        alert('Điền đầy đủ tiêu đề và ảnh');
        return;
    }
    let posts = initializePosts();
    posts.push({
        img: formData.get('image'),
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content') || '',
        status: formData.get('status') || 'public'
    });
    localStorage.setItem('post', JSON.stringify(posts));
    this.reset();
    document.getElementById('addArticleForm').style.display = 'none';
    renderPosts(1);
});

document.addEventListener('DOMContentLoaded', () => renderPosts(currentPage));