function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message; // Cập nhật nội dung snackbar
    snackbar.className = "show"; // Thêm class "show" để hiển thị

    // Sau 3 giây, ẩn snackbar
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nick = JSON.parse(localStorage.getItem("accout")) || [];
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra email
    if (!email) {
        showSnackbar('Email không hợp lệ');
        return;
    }

    // Kiểm tra email đặc biệt
    if (email === "phamhoangnee1@gmail.com") {
        showSnackbar('Email này của chủ web =)) nhập email khác deeeeeee');
        return;
    }

    // Kiểm tra mật khẩu
    if (!password || password.length < 6) {
        showSnackbar('Mật khẩu không hợp lệ phải có ít nhất 6 ký tự');
        return;
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        showSnackbar('Mật khẩu không khớp');
        return;
    }

    // Kiểm tra email đã tồn tại
    let existingUser = nick.find(user => user.gmaildangki === email);
    if (existingUser) {
        showSnackbar('Email đã tồn tại');
        return;
    }

    // Tạo tài khoản mới
    let newAccount = {
        gmaildangki: email,
        matkhaudangki: password 
    };

    // Lưu vào localStorage
    nick.push(newAccount);
    localStorage.setItem("accout", JSON.stringify(nick));

    // Hiển thị snackbar thành công và chuyển hướng
    showSnackbar('Đăng ký thành công');
    setTimeout(function() {
        window.location.href = "./projectLogin.html";
    }, 3000); 
});

function company() {
    window.location.href = "./projectLogin.html";
}
