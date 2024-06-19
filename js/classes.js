// classes.js

export class Sprite {
    constructor({ position, imgSrc, ctx, scale = 1, framesMax = 1 }) {
        this.ctx = ctx;
        this.position = position;
        this.img = new Image();
        this.img.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        // Ensure the image is fully loaded before drawing
        this.img.onload = () => {
            this.width = this.img.width / this.framesMax * this.scale;
            this.height = this.img.height * this.scale;
        }

        // Handle image loading error
        this.img.onerror = () => {
            console.error(`Failed to load image: ${imgSrc}`);
        }
    }

    draw() {
        if (this.img.complete && this.img.naturalWidth !== 0) {  // Ensure image is fully loaded and not broken
            this.ctx.drawImage(
                this.img,
                this.frameCurrent * (this.img.width / this.framesMax),
                0,
                this.img.width / this.framesMax,
                this.img.height,
                this.position.x,
                this.position.y,
                (this.img.width / this.framesMax) * this.scale,
                this.img.height * this.scale
            );
        }
    }

    update() {
        this.draw();
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++;
            } else {
                this.frameCurrent = 0;
            }
        }
    }
}

export class Fighter extends Sprite {
    constructor({position, color = 'red', velocity, offset, ctx, canvas, gravity, imgSrc, scale = 1, framesMax = 1 }) {
        super({ position, imgSrc, ctx, scale, framesMax });
        this.velocity = velocity;
        this.color = color;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.isAttacking = false;
        this.health = 100;
        this.ctx = ctx;
        this.canvas = canvas;
        this.gravity = gravity;
    }

    draw() {
        super.draw();

        if (this.isAttacking) {
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update() {
        super.update(); // Call the parent class's update method

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 9) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += this.gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
