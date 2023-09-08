let grubhubImage;
let isScratching = false;
let scratchingRadius = 75; // Adjust this value to change the scratching area size

function preload() {
    grubhubImage = loadImage('https://raw.githubusercontent.com/Nick113089/p5js-magehosting2/main/grubhub-logo.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    clear(); // Clear the canvas, making it transparent

    // Display the Grubhub image on the main canvas
    image(grubhubImage, 0, 0, windowWidth, windowHeight);

    if (isScratching) {
        // Calculate the startX and startY based on the mouse pointer
        let startX = mouseX - scratchingRadius + 75;
        let startY = mouseY - scratchingRadius + 75;

        // Erase portions of the Grubhub image to reveal the background
        grubhubImage.loadPixels(); // Load the pixel data for the image

        // Loop through pixels within the scratching circle and make them transparent
        for (let x = 0; x < scratchingRadius * 2; x++) {
            for (let y = 0; y < scratchingRadius * 2; y++) {
                if (dist(x, y, scratchingRadius, scratchingRadius) < scratchingRadius) {
                    let pixelX = startX + x;
                    let pixelY = startY + y;

                    if (pixelX >= 0 && pixelX < windowWidth && pixelY >= 0 && pixelY < windowHeight) {
                        let pixelIndex = pixelY * grubhubImage.width + pixelX;
                        grubhubImage.pixels[pixelIndex * 4 + 3] = 0; // Set alpha channel to 0 (transparent)
                    }
                }
            }
        }
        grubhubImage.updatePixels(); // Update the image with modified pixel data
    }
}

function mousePressed() {
    isScratching = true;
}

function mouseReleased() {
    isScratching = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
