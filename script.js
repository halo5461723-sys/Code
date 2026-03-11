let p = { name: "", race: "", lv: 1, exp: 0, gold: 0 };
let monsters = [
    { n: "Sói", hp: 40, g: 10 },
    { n: "Orc", hp: 100, g: 30 },
    { n: "Rồng", hp: 500, g: 100 }
];
let curM = 0;
let mHP = 40;

function handleAuth(type) {
    const user = document.getElementById('u-name').value;
    const pass = document.getElementById('u-pass').value;
    const race = document.getElementById('u-race').value;
    const key = 'SOMALIA_V14_DATA_' + user;

    if (!user || !pass) return alert("Nhập đủ tài khoản/mật khẩu!");

    if (type === 'reg') {
        if (localStorage.getItem(key)) return alert("Đã có tên này!");
        let data = { name: user, pass: pass, race: race, lv: 1, exp: 0, gold: 0 };
        localStorage.setItem(key, JSON.stringify(data));
        alert("Đăng ký xong! Hãy Đăng nhập.");
    } else {
        const saved = localStorage.getItem(key);
        if (!saved) return alert("Không có tài khoản!");
        const data = JSON.parse(saved);
        if (data.pass !== pass) return alert("Sai mật khẩu!");
        p = data;
        startGame();
    }
}

function startGame() {
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
    localStorage.setItem('SOMALIA_V14_DATA_' + p.name, JSON.stringify(p));
}

function doAttack() {
    let dmg = p.race === "Chiến Binh" ? 20 : 10;
    mHP -= dmg;
    if (mHP <= 0) {
        let g = monsters[curM].g * (p.race === "Pháp Sư" ? 1.5 : 1);
        p.gold += g;
        p.exp += 30;
        if (p.exp >= 100) { p.lv++; p.exp = 0; alert("LÊN CẤP!"); }
        alert("Thắng! Nhận " + g + " vàng.");
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
    const items = [{n: "Kiếm", g: 50}, {n: "Giáp", g: 100}];
    document.getElementById('shop-list').innerHTML = "<h3>Shop</h3>" + items.map(i => `
        <div>${i.n} - ${i.g}g <button onclick="buy(${i.g})" style="width:auto; padding:2px 10px;">Mua</button></div>
    `).join('');
}

function buy(g) {
    if (p.gold >= g) { p.gold -= g; alert("Mua xong!"); updateUI(); }
    else alert("Thiếu tiền!");
}
