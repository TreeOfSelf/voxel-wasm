import { gl, initShaderProgram } from "./boilerplate.js";

const shaderProgram = await initShaderProgram(gl, 
    './render/shaders/greedy/vertex.glsl', 
    './render/shaders/greedy/fragment.glsl');

export const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        viewMatrix: gl.getUniformLocation(shaderProgram, "uViewMatrix"),
    },
};

export function initBuffers(gl, vertices) {

    const indiceBuffer = gl.createBuffer();
    const positionBuffer = gl.createBuffer();

    //Pre-allocate indice buffer 

    let indice = [];
    for(let k=0; k<=99999; k++){
        let q = k*4;
        indice.push(q, q+1 ,q+2 ,q ,q+2 ,q+3);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indice), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.slice(1,vertices[0] + 1), gl.STATIC_DRAW);

    return {
        indice : indiceBuffer,
        position: positionBuffer,
    };
}

function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
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


export function setAttributes(gl, buffers, programInfo) {
    setPositionAttribute(gl, buffers, programInfo);
}