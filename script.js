const game = {
    data: { name: "", gold: 0, hp: 100 },
    
    login() {
        const name = document.getElementById('username').value;
        if (!name) return alert("Nhập tên đi bạn!");
        this.data.name = name;
        document.getElementById('display-name').innerText = name;
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        this.save();
        this.renderMonster();
    },

    save() {
        localStorage.setItem('SOMALIA_V14_DATA_', JSON.stringify(this.data));
    },

    renderMonster() {
        document.getElementById('n-name').innerText = "Bù Nhìn Rơm";
        document.getElementById('n-hp').innerText = this.data.hp;
    },

    attack() {
        this.data.hp -= 20;
        document.getElementById('n-hp').innerText = this.data.hp;
        if (this.data.hp <= 0) {
            this.data.gold += 10;
            this.data.hp = 100;
            document.getElementById('display-gold').innerText = this.data.gold;
            alert("Quái chết! Bạn nhận 10 vàng.");
            this.renderMonster();
            this.save();
        }
    }
};
