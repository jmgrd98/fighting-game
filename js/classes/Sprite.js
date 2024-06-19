export default class Sprite {
    constructor({ position, imgSrc, ctx, scale = 1 }) {
        this.ctx = ctx;
        this.position = position;
        this.width = innerWidth;
        this.height = innerHeight;
        this.img = new Image();
        this.img.src = imgSrc;
        this.scale = scale;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.img.width * this.scale,
            this.img.height * this.scale
        );
    }

    update() {
        this.draw();
    }
}