import { programInfo, initBuffers, setPositionAttribute, gl } from './boilerplate.js';
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
    
    let buffers = initBuffers(gl, vertices)
    setPositionAttribute(gl, buffers, programInfo);

    camera.updateViewMatrix();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    setPositionAttribute(gl, buffers, programInfo);

    gl.useProgram(programInfo.program);

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

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
    
    input(camera);

    requestAnimationFrame(drawScene);
}