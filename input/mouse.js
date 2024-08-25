const mouseListener = document.body;

export class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.movementX = 0;
        this.movementY = 0;
        this.pressed = [false, false, false];

        mouseListener.addEventListener("mousemove", (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        
            this.movementX = e.movementX;
            this.movementY = e.movementY;
        });

        mouseListener.addEventListener("mousedown", (e) => {
            this.pressed[e.button] = true;
        });

        mouseListener.addEventListener("mouseup", (e) => {
            this.pressed[e.button] = true;
        });

    }
}

