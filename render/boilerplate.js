import { loadUrl } from '../lib/lib.js';

export const canvas = document.querySelector("#gl");
export const gl = canvas.getContext("webgl2");

export async function initShaderProgram(gl, vertexShaderUrl, fragmentShaderUrl) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, await loadUrl(vertexShaderUrl));
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, await loadUrl(fragmentShaderUrl));

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

export function setScreenSize() {
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

export function clearScreen() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
