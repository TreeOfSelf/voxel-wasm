import { gl, setScreenSize, clearScreen } from './boilerplate.js';
import * as greedy from './shaders/greedy.js';
import * as ui from './shaders/ui.js';
import { Camera } from '../entities/camera.js';
import { vec3 } from '../lib/gl-matrix.js';
import { input } from '../input/control.js';

const camera = new Camera(vec3.fromValues(0, 0, -12), vec3.fromValues(0, 0, 0), 45, gl.canvas.clientWidth / gl.canvas.clientHeight);
var vertices = new Int32Array();

export function startRendering(inputVertices) {
    vertices = inputVertices;
    drawGame();
}

function drawGame() {

    setScreenSize();

    camera.setAspect(gl.canvas.clientWidth / gl.canvas.clientHeight);
    camera.updateViewMatrix();
    input(camera);

    clearScreen();
    
    greedy.draw(vertices, camera);
    ui.draw([gl.canvas.clientWidth , gl.canvas.clientHeight]);
    
    requestAnimationFrame(drawGame);
}