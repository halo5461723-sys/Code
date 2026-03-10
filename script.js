function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "" || pass === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return; // Dừng lại ở đây nếu chưa nhập
    }

    // Hiển thị màn hình game, ẩn màn hình đăng nhập
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('welcome-msg').innerText = "Chào mừng " + user;
    
    console.log("Đã đăng nhập thành công!");
}

function attack() {
    alert("Bạn đã tấn công quái!");
}
