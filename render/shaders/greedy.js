import { gl, initShaderProgram } from "../boilerplate.js";

const shaderProgram = await initShaderProgram(gl, 
    './render/shaders/greedy/vertex.glsl', 
    './render/shaders/greedy/fragment.glsl');

 const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        viewMatrix: gl.getUniformLocation(shaderProgram, "uViewMatrix"),
    },
};

function initBuffers(gl, vertices) {

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


function setAttributes(gl, buffers) {
    setPositionAttribute(gl, buffers, programInfo);
}

export function draw(vertices, camera) {
    gl.useProgram(programInfo.program);

    let buffers = initBuffers(gl, vertices)
    
    setAttributes(gl, buffers, programInfo);

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

    gl.drawElements(gl.TRIANGLES, vertices[0], gl.UNSIGNED_INT, 0);
}