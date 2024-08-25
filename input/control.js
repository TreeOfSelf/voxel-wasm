import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { vec3 } from "../lib/gl-matrix.js";

const mouse = new Mouse();
const keyboard = new Keyboard();

export function input(entity) {

    vec3.add(entity.rotation, entity.rotation, vec3.fromValues(mouse.movementY * 0.01, mouse.movementX * 0.01, 0));
    mouse.movementX = 0;
    mouse.movementY = 0;

    if (keyboard.isKeyPressed("s")) {
        vec3.add(entity.position, entity.position, vec3.fromValues(0,0,-0.01));
    }
}