import { gl, initShaderProgram } from "../boilerplate.js";

const shaderProgram = await initShaderProgram(gl, 
    './render/shaders/greedy/vertex.glsl', 
    './render/shaders/greedy/fragment.glsl');

 const programInfo = {
    program: shaderProgram,
    attribLocations: {
        position: gl.getAttribLocation(shaderProgram, "aPosition"),
        blockType: gl.getAttribLocation(shaderProgram, "aBlockType"),
        textureCoordinates: gl.getAttribLocation(shaderProgram, "aTextureCoordinates"),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        viewMatrix: gl.getUniformLocation(shaderProgram, "uViewMatrix"),
        sampler: gl.getUniformLocation(shaderProgram, "uSampler"),

    },
};

function initBuffers(gl, vertices, blockType, textureCoordinates) {
    
    const indiceBuffer = gl.createBuffer();
    const positionBuffer = gl.createBuffer();
    const blockTypeBuffer = gl.createBuffer();
    const textureCoordinatesBuffer = gl.createBuffer();


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

    gl.bindBuffer(gl.ARRAY_BUFFER, blockTypeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, blockType.slice(1,blockType[0] + 1), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinatesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates.slice(1,textureCoordinates[0] + 1), gl.STATIC_DRAW);
    
    return {
        indice : indiceBuffer,
        position : positionBuffer,
        blockType : blockTypeBuffer,
        textureCoordinates : textureCoordinatesBuffer,
    };
}

function setPositionAttribute(gl, buffers, programInfo) {

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.position,
        3, // Components
        gl.UNSIGNED_BYTE, // Type 
        false, //Normalize
        0,
        0,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.position);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.blockType);
    gl.vertexAttribPointer(programInfo.attribLocations.blockType, 1, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(programInfo.attribLocations.blockType);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoordinates);
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoordinates, 2, gl.UNSIGNED_BYTE, false, 0,0);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoordinates);
}


function setAttributes(gl, buffers) {
    setPositionAttribute(gl, buffers, programInfo);
}

export function draw(vertices, blockType, textureCoordinates, camera) {
    gl.useProgram(programInfo.program);

    let buffers = initBuffers(gl, vertices, blockType, textureCoordinates)
    
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

    gl.uniform1i(programInfo.uniformLocations.sampler,0);	
    gl.drawElements(gl.TRIANGLES, vertices[0], gl.UNSIGNED_INT, 0);
}