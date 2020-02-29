let bubbles = [];
let flower;
let kittens = [];
const nrow = 3;
const ncol = 4;
const delta = 10;

function preload() {
    flower = loadImage('kittens/flower.png');
    for (let i = 0; i < 5; i++) {
        kittens[i] = loadImage(`kittens/kitten${i}.jpg`);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < nrow; i++) {
        for (let j = 0; j < ncol; j++) {
            let x = width / ncol * j + random(-delta, delta);
            let y = height / nrow * i + random(-delta, delta);
            let r = floor(height / 4);
            let b = new Bubble(x, y, r);
            bubbles.push(b);
        }
    }
}

function mousePressed() {
    let allClicked = true;
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].clicked(mouseX, mouseY);
        allClicked &= bubbles[i].isClicked;
    }
    if (allClicked) {
        console.log('all clicked', allClicked);
        window.location.reload();
    }
}

function draw() {
    background(255);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].show();
    }
}

class Bubble {
    constructor(x, y, r, img) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.kitten = random(kittens);
        this.isClicked = false;
    }

    clicked(px, py) {

        if (
            px > this.x &&
            px < this.x + this.r &&
            py > this.y &&
            py < this.y + this.r
        ) {
            this.kitten = flower; //random(kittens);
            this.isClicked = true;
        }
    }

    show() {
        image(this.kitten, this.x, this.y, this.r, this.r);
    }
}