attribute vec2 aVertexPosition;

uniform ivec2 uScreenSize;

void main() {
    gl_Position = vec4(aVertexPosition.x / float(uScreenSize.x) , aVertexPosition.y / float(uScreenSize.y), -1.0, 1.0);
}