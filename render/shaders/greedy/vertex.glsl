#version 300 es

in vec4 aPosition;
in float aBlockType;
in vec2 aTextureCoordinates;

uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

out vec3 vPosition;
flat out float vBlockType;
out vec2 vTextureCoordinates;

void main() {
    gl_Position = uProjectionMatrix * uViewMatrix * aPosition;
    vPosition = aPosition.xyz;
    vBlockType = aBlockType;
    vTextureCoordinates = aTextureCoordinates;
}