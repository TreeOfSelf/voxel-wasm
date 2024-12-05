import { gl, setScreenSize, clearScreen } from './boilerplate.js';
import * as greedy from './shaders/greedy.js';
import * as ui from './shaders/ui.js';
import { Camera } from '../entities/camera.js';
import { vec3 } from '../lib/gl-matrix.js';
import { input } from '../input/control.js';
import { createTextures } from './texture.js';

const camera = new Camera(vec3.fromValues(0, -5, -13), vec3.fromValues(0, 0, 0), 45, gl.canvas.clientWidth / gl.canvas.clientHeight);
var vertices = new Uint8Array();
var blockType = new Uint8Array();
var textureCoordinates = new Uint8Array();


export function startRendering(inputVertices, inputBlockType, inputTextureCoordinates) {
    createTextures();
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    vertices = inputVertices;
    blockType = inputBlockType;
    textureCoordinates = inputTextureCoordinates;
    drawGame();
}

function drawGame() {

    setScreenSize();

    camera.setAspect(gl.canvas.clientWidth / gl.canvas.clientHeight);
    camera.updateViewMatrix();
    input(camera);

    clearScreen();
    
    greedy.draw(vertices, blockType, textureCoordinates, camera);
    ui.draw([gl.canvas.clientWidth , gl.canvas.clientHeight]);
    
    requestAnimationFrame(drawGame);
}