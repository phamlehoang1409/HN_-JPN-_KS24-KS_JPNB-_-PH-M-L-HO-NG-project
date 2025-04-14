// function backtoHome(){
//     window.location.href="./projectHome.html";
// }

// let posts = JSON.parse(localStorage.getItem("post")) || [];
// let imgcanhienthinoidung = JSON.parse(localStorage.getItem("baichitiet")) || {};

// console.log(`Ảnh được chọn: ${imgcanhienthinoidung.img}`);

// function display() {
//     let content_1 = document.querySelector(".content_1");
//     content_1.innerHTML = "";

//     // tìm bài viết theo ảnh
//     let vitri = posts.findIndex(item => item.img === imgcanhienthinoidung.img);
//     if (vitri === -1) {
//         content_1.innerHTML = "<p>Không tìm thấy bài viết</p>";
//         return;
//     }

//     let post = posts[vitri];

//     // tạo HTML hiển thị bài viết
//     let html = `
//         <div class="post-detail">
//             <div class="post-image">
//                 <img src="${post.img}" alt="Ảnh bài viết">
//             </div>
//             <div class="post-info">
//                 <h1>${post.title}</h1>
//                 <p>${post.content}</p>
//             </div>

//             <div class="comments-section">
//                 <p class="viewCmt">Xem tất cả 12 bình luận</p>

//                 <div class="comment">
//                     <img src="img-icon/avt1.jpg" alt="Avatar 1">
//                     <div class="comment-content">
//                         <p>Thánh sống omg omg!!</p>
//                         <div class="react">
//                             <p>15 Like <img src="img-icon/like.jpg" alt=""></p>
//                             <p>6 Trả lời <img src="img-icon/cmt.jpg" alt=""></p>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="comment">
//                     <img src="img-icon/avt2.jpg" alt="Avatar 2">
//                     <div class="comment-content">
//                         <p>Quá đắng cấp luôn shop!!</p>
//                         <div class="react">
//                             <p>20 Like <img src="img-icon/like.jpg" alt=""></p>
//                             <p>2 Trả lời <img src="img-icon/cmt.jpg" alt=""></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     content_1.innerHTML = html;
// }

// display();


function backtoHome() {
    window.location.href = "./projectHome.html";
}

let posts = JSON.parse(localStorage.getItem("post")) || [];
let imgcanhienthinoidung = JSON.parse(localStorage.getItem("baichitiet")) || {};

console.log(`Ảnh được chọn: ${imgcanhienthinoidung.img}`);

function display() {
    let content_1 = document.querySelector(".content_1");
    content_1.innerHTML = "";

    // tìm bài viết theo ảnh
    let vitri = posts.findIndex(item => item.img === imgcanhienthinoidung.img);
    if (vitri === -1) {
        content_1.innerHTML = "<p>Không tìm thấy bài viết</p>";
        return;
    }

    let post = posts[vitri];

    // html cho bình luận
    let commentsHtml = "";
    if (post.comments && post.comments.length > 0) {
        post.comments.forEach(comment => {
            commentsHtml += `
                <div class="comment">
                    <div class="comment-content">
                        <p>${comment.content}</p>
                        <div class="react">
                            <p>${comment.likes} Like <img src="img-icon/like.jpg" alt=""></p>
                            <p>${comment.replies} Trả lời <img src="img-icon/cmt.jpg" alt=""></p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // html tổng thể
    let html = `
        <div class="post-detail">
            <div class="post-image">
                <img src="${post.img}" alt="Ảnh bài viết">
            </div>
            <div class="post-info">
                <h1>${post.title}</h1>
                <p>${post.content}</p>
            </div>

            <div class="comments-section">
                <p class="viewCmt">Xem tất cả ${post.comments ? post.comments.length : 0} bình luận</p>

                ${commentsHtml}

                <!-- Form thêm bình luận -->
                <div class="add-comment">
                    <textarea id="newComment" placeholder="Viết bình luận của bạn" rows="2"></textarea>
                    <button onclick="addComment()">Gửi bình luận</button>
                </div>
            </div>
        </div>
    `;

    content_1.innerHTML = html;
}

function addComment() {
    let commentText = document.getElementById("newComment").value.trim();
    if (commentText === "") {
        alert("Vui lòng nhập nội dung bình luận!");
        return;
    }

  // mảng comment
    let vitri = posts.findIndex(item => item.img === imgcanhienthinoidung.img);
    if (vitri !== -1) {
       // nếu phát hiện không có thì hiển thị mảng rỗng
        if (!posts[vitri].comments) {
            posts[vitri].comments = [];
        }

        // thêm bình luận mới
        posts[vitri].comments.push({
            content: commentText,
            likes: 0,
            replies: 0
        });

 // lưu vào lc      
        localStorage.setItem("post", JSON.stringify(posts));

        // reload lại giao diện
        display();

       // xoá nd khi đăng xong
        document.getElementById("newComment").value = "";
    } else {
        alert("Không tìm thấy bài viết ");
    }
}
// hiển thị
display();
