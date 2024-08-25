import { loadUrl } from '../lib/lib.js';

export const canvas = document.querySelector("#gl");
export const gl = canvas.getContext("webgl2");

async function initShaderProgram(gl) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, await loadUrl('./render/shaders/vertex.glsl'));
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, await loadUrl('./render/shaders/fragment.glsl'));

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram,)}`);
        return null;
    }

    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

const shaderProgram = await initShaderProgram(gl);

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
    for(let k=0;k<=99999;k++){
        let q = k*4;
        indice.push(q,q+1,q+2,q,q+2,q+3);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indice), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

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