let p = { name: "", race: "", lv: 1, exp: 0, gold: 0 };
let monsters = [
    { n: "Sói Rừng", hp: 30, g: 10 },
    { n: "Orc Xanh", hp: 80, g: 30 },
    { n: "Rồng Lửa", hp: 300, g: 100 }
];
let curM = 0;
let mHP = 30;

function handleAuth(type) {
    const user = document.getElementById('u-name').value;
    const pass = document.getElementById('u-pass').value;
    const race = document.getElementById('u-race').value;
    const storageKey = 'SOMALIA_V14_DATA_' + user;

    if (!user || !pass) {
        alert("Phải nhập cả tên và mật khẩu!");
        return;
    }

    if (type === 'reg') {
        if (localStorage.getItem(storageKey)) {
            alert("Tên này có người dùng rồi!");
        } else {
            let newData = { name: user, pass: pass, race: race, lv: 1, exp: 0, gold: 0 };
            localStorage.setItem(storageKey, JSON.stringify(newData));
            alert("Đăng ký xong! Giờ bấm Đăng nhập nhé.");
        }
    } else {
        const saved = localStorage.getItem(storageKey);
        if (!saved) {
            alert("Không tìm thấy tài khoản này!");
        } else {
            const data = JSON.parse(saved);
            if (data.pass === pass) {
                p = data;
                start();
            } else {
                alert("Sai mật khẩu rồi!");
            }
        }
    }
}

function start() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    renderShop();
    changeMonster();
    updateUI();
}

function updateUI() {
    document.getElementById('txt-user').innerText = p.name + " (" + p.race + ")";
    document.getElementById('txt-lv').innerText = p.lv;
    document.getElementById('txt-gold').innerText = Math.floor(p.gold);
    document.getElementById('txt-m-name').innerText = monsters[curM].n;
    document.getElementById('txt-m-hp').innerText = mHP;
    
    // Lưu tự động mỗi khi có thay đổi
    localStorage.setItem('SOMALIA_V14_DATA_' + p.name, JSON.stringify(p));
}

function doAttack() {
    let dmg = (p.race === "Chiến Binh") ? 15 : 10;
    mHP -= dmg;
    if (mHP <= 0) {
        let bonus = (p.race === "Pháp Sư") ? 1.5 : 1;
        p.gold += monsters[curM].g * bonus;
        p.exp += 20;
        if (p.exp >= 100) { p.lv++; p.exp = 0; alert("LÊN CẤP!"); }
        alert("Thắng rồi! Nhận vàng.");
        changeMonster();
    }
    updateUI();
}

function changeMonster() {
    curM = Math.floor(Math.random() * monsters.length);
    mHP = monsters[curM].hp;
    updateUI();
}

function renderShop() {
    const items = [ {n: "Kiếm Sắt", g: 50}, {n: "Trượng Cổ", g: 100} ];
    document.getElementById('shop-list').innerHTML = items.map(i => `
        <div style="margin:5px; border-bottom:1px solid #444; padding:5px;">
            ${i.n} - ${i.g}g <button onclick="buy('${i.g}')">Mua</button>
        </div>
    `).join('');
}

function buy(cost) {
    if (p.gold >= cost) {
        p.gold -= cost;
        alert("Mua thành công!");
        updateUI();
    } else {
        alert("Hết tiền rồi!");
    }
}
