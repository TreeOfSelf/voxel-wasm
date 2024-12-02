import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { vec3, mat4 } from "../lib/gl-matrix.js";

const mouse = new Mouse();
const keyboard = new Keyboard();

export function input(entity) {

    entity.rotation[0] += mouse.movementX * 0.01;
    entity.rotation[1] += mouse.movementY * 0.01;

    entity.rotation[1] = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, entity.rotation[1]));

    mouse.movementX = 0;
    mouse.movementY = 0;

    const forward = vec3.fromValues(
        Math.sin(entity.rotation[0]),
        0,
        -Math.cos(entity.rotation[0])
    );

    const right = vec3.fromValues(
        Math.cos(entity.rotation[0]),
        0,
        Math.sin(entity.rotation[0])
    );

    const up = vec3.create(); 
    vec3.cross(up, right, forward); 
    vec3.normalize(up, up);

    const speed = 0.1;

    if (keyboard.isKeyPressed("w")) 
        vec3.scaleAndAdd(entity.position, entity.position, forward, -speed);

    if (keyboard.isKeyPressed("s")) 
        vec3.scaleAndAdd(entity.position, entity.position, forward, speed);
    
    if (keyboard.isKeyPressed("a")) 
        vec3.scaleAndAdd(entity.position, entity.position, right, speed);
    
    if (keyboard.isKeyPressed("d")) 
        vec3.scaleAndAdd(entity.position, entity.position, right, -speed);

    if (keyboard.isKeyPressed("o")) 
        vec3.scaleAndAdd(entity.position, entity.position, up, -speed);

    if (keyboard.isKeyPressed("p")) 
        vec3.scaleAndAdd(entity.position, entity.position, up, speed);
    
}
