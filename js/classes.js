// classes.js

export class Sprite {
    constructor({ position, imgSrc, ctx, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
        this.ctx = ctx;
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;

        this.image.onload = () => {
            this.width = (this.image.width / this.framesMax) * this.scale;
            this.height = this.image.height * this.scale;
        }

        this.image.onerror = () => {
            console.error(`Failed to load image: ${imgSrc}`);
        }
    }

    draw() {
        if (this.image.complete && this.image.naturalWidth !== 0) {
            this.ctx.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );
        }
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

export class Fighter extends Sprite {
    constructor({
        position,
        color = 'red',
        velocity,
        ctx,
        canvas,
        gravity,
        imgSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites
    }) {
        super({
            position,
            imgSrc,
            ctx,
            scale,
            framesMax,
            offset
        });
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
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imgSrc;
        }
    }

    update() {
        this.draw();
        this.animateFrames();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = this.canvas.height - this.height - 96;
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
