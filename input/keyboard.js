const keyboardListener = document.body;

export class Keyboard {
    constructor() {
        this.keys = [];

        keyboardListener.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
        });

        keyboardListener.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        });
    }

    isKeyPressed = function(key) {
        return this.keys[key] == null ? false : this.keys[key];
    }
}

