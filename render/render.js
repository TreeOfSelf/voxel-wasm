import { programInfo, initBuffers, setAttributes, gl } from './boilerplate.js';
import { Camera } from '../entities/camera.js';
import { vec3 } from '../lib/gl-matrix.js';
import { input } from '../input/control.js';

const camera = new Camera(vec3.fromValues(0, 0, -12), vec3.fromValues(0, 0, 0), 45, gl.canvas.clientWidth / gl.canvas.clientHeight);
var vertices = new Int32Array();

export function startRendering(inputVertices) {
    vertices = inputVertices;
    drawScene();
}

function drawScene() {
    
    gl.useProgram(programInfo.program);

    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    let buffers = initBuffers(gl, vertices)
    
    setAttributes(gl, buffers, programInfo);

    camera.setAspect(gl.canvas.clientWidth / gl.canvas.clientHeight);
    camera.updateViewMatrix();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        camera.projectionMatrix,
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.viewMatrix,
        false,
        camera.viewMatrix,
    );

    
    gl.drawElements(gl.LINES, vertices.length, gl.UNSIGNED_INT, 0);
    
    input(camera);

    requestAnimationFrame(drawScene);
}