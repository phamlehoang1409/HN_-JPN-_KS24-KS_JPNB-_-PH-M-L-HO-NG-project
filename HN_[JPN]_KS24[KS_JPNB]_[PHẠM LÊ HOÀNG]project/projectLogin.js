
        function update(){
            window.location = "./project.html";
        }
        function login() {
            let check = null;
            let sum = JSON.parse(localStorage.getItem('accout')) || [];
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let account = JSON.parse(localStorage.getItem("accout")) || [];
            
            if(email===`phamhoangnee1@gmail.com`){
                if(password===`123456`){
                    window.location.href = "./projectAdmin.html";
                    return;
                   
            }
        }
            sum.forEach(function(sl){
                if (sl.gmaildangki === email && sl.matkhaudangki === password) {
                    check = true;
                    window.location.href = "./projectHome.html";}
            })
            if (check === null) {
                alert('Đăng nhập thất bại mât khẩu hoặc tài khoản không đúng');
            }
        }
        
   