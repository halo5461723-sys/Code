// Dữ liệu ban đầu
let player = { user: "", pass: "", race: "", lv: 1, exp: 0, gold: 0 };
let monsters = [
    { name: "Sói Xám", hp: 40, maxHp: 40, exp: 20, gold: 10 },
    { name: "Orc Xanh", hp: 100, maxHp: 100, exp: 50, gold: 25 },
    { name: "Rồng Lửa", hp: 500, maxHp: 500, exp: 200, gold: 100 }
];
let shopItems = [
    { name: "Kiếm Gỗ 🗡️", price: 50 },
    { name: "Trượng Cổ 🪄", price: 150 },
    { name: "Giáp Thép 🛡️", price: 300 }
];
let currentM = 0;
let mHP = 40;

// Hệ thống xác thực
function auth(type) {
    const u = document.getElementById('u-input').value;
    const p = document.getElementById('p-input').value;
    const r = document.getElementById('r-input').value;
    const key = 'SOMALIA_V14_DATA_' + u;

    if (!u || !p) return alert("Vui lòng điền đủ!");

    if (type === 'reg') {
        if (localStorage.getItem(key)) return alert("Tài khoản đã tồn tại!");
        player = { user: u, pass: p, race: r, lv: 1, exp: 0, gold: 0 };
        localStorage.setItem(key, JSON.stringify(player));
        alert("Đăng ký thành công!");
    } else {
        const saved = localStorage.getItem(key);
        if (!saved) return alert("Tài khoản không tồn tại!");
        const data = JSON.parse(saved);
        if (data.pass !== p) return alert("Sai mật khẩu!");
        player = data;
        loadGame();
    }
}

function loadGame() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    renderShop();
    updateUI();
}

// Hệ thống Shop
function renderShop() {
    const list = document.getElementById('shop-items');
    list.innerHTML = shopItems.map(item => `
        <div class="shop-item">
            <span>${item.name}</span>
            <button onclick="action.buy(${item.price})">${item.price}g</button>
        </div>
    `).join('');
}

// Logic hành động
const action = {
    attack() {
        const dmg = player.race === "Chiến Binh" ? 15 : 10;
        mHP -= dmg;
        if (mHP <= 0) {
            const m = monsters[currentM];
            player.exp += m.exp;
            player.gold += (player.race === "Pháp Sư" ? m.gold * 1.5 : m.gold);
            alert(`Diệt ${m.name}! Nhận ${m.exp} Exp và ${m.gold} Vàng.`);
            this.checkLevel();
            this.next();
        }
        updateUI();
        this.save();
    },
    next() {
        currentM = Math.floor(Math.random() * monsters.length);
        mHP = monsters[currentM].maxHp;
        updateUI();
    },
    checkLevel() {
        if (player.exp >= 100) {
            player.lv++;
            player.exp = 0;
            alert("Chúc mừng! Bạn đã lên cấp " + player.lv);
        }
    },
    buy(price) {
        if (player.gold >= price) {
            player.gold -= price;
            alert("Mua đồ thành công!");
            updateUI();
            this.save();
        } else {
            alert("Không đủ vàng!");
        }
    },
    save() {
        localStorage.setItem('SOMALIA_V14_DATA_' + player.user, JSON.stringify(player));
    }
};

function updateUI() {
    document.getElementById('s-user').innerText = player.user;
    document.getElementById('s-race').innerText = player.race;
    document.getElementById('s-lv').innerText = player.lv;
    document.getElementById('s-gold').innerText = Math.floor(player.gold);
    document.getElementById('exp-bar').style.width = player.exp + "%";
    document.getElementById('m-name').innerText = monsters[currentM].name;
    document.getElementById('m-hp').innerText = mHP;
    document.getElementById('m-maxhp').innerText = monsters[currentM].maxHp;
        }

