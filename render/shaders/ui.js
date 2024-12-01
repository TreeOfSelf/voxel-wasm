import { gl, initShaderProgram } from "../boilerplate.js";

const shaderProgram = await initShaderProgram(gl, 
    './render/shaders/ui/vertex.glsl', 
    './render/shaders/ui/fragment.glsl');

const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
        screenSize: gl.getUniformLocation(shaderProgram, "uScreenSize"),
    },
};

function initBuffers(gl) {

    const positionBuffer = gl.createBuffer();

    let positionArray = [0,0,
                         128,0,
                         128,128,
                         128,128,
                         0, 128,
                         0, 0 ];

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Int32Array(positionArray), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
    };
}

function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 2;
    const type = gl.INT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}


function setAttributes(gl, buffers, programInfo) {
    setPositionAttribute(gl, buffers, programInfo);
}


export function draw(screenSize) {
    gl.useProgram(programInfo.program);

    let buffers = initBuffers(gl)
    
    setAttributes(gl, buffers, programInfo);

    gl.uniform2iv(
        programInfo.uniformLocations.screenSize,
        screenSize,
    );

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}