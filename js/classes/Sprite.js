export default class Sprite {
    constructor({ position }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
    }

    draw() {}

    update() {
        this.draw();
    }
}