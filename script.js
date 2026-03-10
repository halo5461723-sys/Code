// Biến lưu dữ liệu
const monsters = ["Bù Nhìn Rơm", "Người Xương", "Vua Xương", "Shadow"];
let index = 0;

// Gán sự kiện nút bấm
document.getElementById('btn-next').addEventListener('click', function() {
    index = (index + 1) % monsters.length;
    document.getElementById('n-name').innerText = monsters[index];
    console.log("Đã đổi quái thành: " + monsters[index]);
});
