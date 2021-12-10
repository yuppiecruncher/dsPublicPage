const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
    // radius should be relative to canvas size
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }
    // check particle position, 
    // check mouse position, 
    // move the particle, 
    // draw the particle
    update() {
        // check if particle is still within the canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // check collision detection - 
        // mouse position / particle position
        let dx = mouse.x - this.x; // x distance between mouse and particle
        let dy = mouse.y - this.y; // y distance between mouse and particle
        let distance = Math.sqrt(dx * dx + dy * dy); // pythagorean equivalent for hypoteneuse
        if (distance < mouse.radius + this.size) { // only do these expensive calcs if hypoteneuse is smaller than the radii
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
                // if mouse is on left and particle is inside canvas by a margin (this.size * 10)
                // bounce the particle to the right by 10 
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
                // inverse of above
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
                // if mouse is below particle and particle is within the canvas by the margin
                // bounce the particle up by 10
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
                // inverse of above
            }
        }
        // for all particles not colliding, move them along their x and y axes
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle call repeats for each particle
        this.draw();
    }
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        // size: random number between 1 and 5
        let size = (Math.random() * 5) + 1;
        // x and y: random number between 0 and canvas width and height. 
        // particle size is used as a buffer around the border of the canvas
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        // determine how many pixels the particles animate in each direction 
        // for each step of the update() function
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        // call particlesArray class as many times as calculated by numberOfParticles, 
        // invoke instance with generated values and push to the array
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}
init();
animate();