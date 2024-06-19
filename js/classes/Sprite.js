export default class Sprite {
    constructor({ position, imgSrc, ctx }) {
        this.position = position;
        this.width = innerWidth;
        this.height = innerHeight;
        this.img = new Image();
        this.img.src = imgSrc;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}