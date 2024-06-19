const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.2;

class Sprite {
    constructor({position, color, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.height = 150;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: "red"
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: "blue"
});


function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}

animate();

window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        player.velocity.x = 5;
    } else if (event.key === "a") {
        player.velocity.x = -5;
    } else if (event.key === "w") {
        player.velocity.y = -5;
    } else if (event.key === "s") {
        player.velocity.y = 5;
    }
});

window.addEventListener("keyup", (event) => {
    player.velocity.x = 0;
})