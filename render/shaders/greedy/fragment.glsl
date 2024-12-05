#version 300 es
 
precision lowp float;

in vec3 vPosition;
flat in float vBlockType;
in vec2 vTextureCoordinates;

uniform lowp sampler2DArray uSampler;

out vec4 fragColor;

void main() {
    fragColor = texture(uSampler,vec3(vTextureCoordinates[0],vTextureCoordinates[1],vBlockType));
}