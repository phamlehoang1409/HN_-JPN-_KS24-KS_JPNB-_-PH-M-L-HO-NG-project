document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nick = JSON.parse(localStorage.getItem("accout")) || [];
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (!email) {
        alert('Email không hợp lệ');
        return;
    }
    if(email === "phamhoangnee1@gmail.com"){
        alert('Email này của chủ web =)) nhập email khác deeeeeee');
        return;
    }
    if (!password || password.length < 6) {
       alert('Mật khẩu không hợp lệ phải có ít nhất 6 ký tự');
        return;
    }

    if (password !== confirmPassword) {
       alert('Mật khẩu không khớp');
        return;
    }

    let existingUser = nick.find(user => user.gmaildangki === email);
    if (existingUser) {
       alert('Email đã tồn tại');
        return;
    }

  
    let newAccount = {
        gmaildangki: email,
        matkhaudangki: password 
    };

    nick.push(newAccount);
    localStorage.setItem("accout", JSON.stringify(nick));

    alert('Đăng ký thành công');
    window.location.href = "./projectLogin.html";
});
function company(){
    window.location.href = "./projectLogin.html";
}
