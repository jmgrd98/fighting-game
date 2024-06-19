export default class Sprite {
    constructor({ position, imgSrc, ctx, scale = 1, framesMax = 1 }) {
        this.ctx = ctx;
        this.position = position;
        this.width = innerWidth;
        this.height = innerHeight;
        this.img = new Image();
        this.img.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    draw() {
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