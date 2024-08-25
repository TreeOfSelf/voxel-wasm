attribute vec4 aVertexPosition;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
varying vec3 vPosition; 

void main() {
    gl_Position = uProjectionMatrix * uViewMatrix * aVertexPosition;
    vPosition = aVertexPosition.xyz;
}