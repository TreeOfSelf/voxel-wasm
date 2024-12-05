attribute vec2 aPosition;

uniform ivec2 uScreenSize;

void main() {
    gl_Position = vec4(aPosition.x / float(uScreenSize.x) , aPosition.y / float(uScreenSize.y), -1.0, 1.0);
}