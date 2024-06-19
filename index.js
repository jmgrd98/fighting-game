import Sprite from "./js/classes/Sprite.js";
import Fighter from "./js/classes/Fighter.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(innerWidth, 1024); // Restrict canvas width to 1024 or window width, whichever is smaller
canvas.height = innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

const gravity = 0.7;

const background = new Sprite({
    ctx: ctx,
    position: {
        x: 0,
        y: 0
    },
    imgSrc: "./assets/background.png"
});

const player = new Fighter({
    ctx: ctx,
    canvas: canvas,
    gravity: gravity,
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    },
    color: "red"
});

const enemy = new Fighter({
    ctx: ctx,
    canvas: canvas,
    gravity: gravity,
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: -50,
        y: 0
    },
    color: "blue"
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health == enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    }

    if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
    }

    if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    }
}

let timer = 60;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId });
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.update();

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    } else if (keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y = -5;
    } else if (keys.s.pressed && player.lastKey === 's') {
        player.velocity.y = 5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    } else if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y = -5;
    } else if (keys.ArrowDown.pressed && enemy.lastKey === 'ArrowDown') {
        enemy.velocity.y = 5;
    }

    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && 
        player.isAttacking
    ) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector("#enemyHealth").style.width = `${enemy.health}%`;
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
        enemy.isAttacking
    ) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector("#playerHealth").style.width = `${player.health}%`;
    }

    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
}

animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case "a":
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case "w":
            player.velocity.y = -20;
            break;
        case "s":
            keys.s.pressed = true;
            player.lastKey = 's';
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case "ArrowUp":
            enemy.velocity.y = -20;
            break;
        case "ArrowDown":
            // keys.ArrowDown.pressed = true;
            // enemy.lastKey = 'ArrowDown';
            enemy.attack();
            break;

        case " ":
            player.attack();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;
        case "ArrowDown":
            keys.ArrowDown.pressed = false;
            break;
    }
})