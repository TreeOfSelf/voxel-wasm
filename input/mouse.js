import { gl } from "../render/boilerplate.js";

const mouseListener = document.body;

export class Mouse {
    constructor(gl) {
        this.x = 0;
        this.y = 0;
        this.movementX = 0;
        this.movementY = 0;
        this.pressed = [false, false, false];

        mouseListener.addEventListener("mousemove", (e) => {
            if (document.pointerLockElement) {
                this.x = e.clientX;
                this.y = e.clientY;
            
                this.movementX = e.movementX;
                this.movementY = e.movementY;
            }
        });

        mouseListener.addEventListener("mousedown", (e) => {
            this.pressed[e.button] = true;

            if (!document.pointerLockElement) {
                mouseListener.requestFullscreen();
                mouseListener.requestPointerLock();
            }
        });

        mouseListener.addEventListener("mouseup", (e) => {
            this.pressed[e.button] = true;
        });

    }
}

