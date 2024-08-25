precision lowp float;

varying vec3 vPosition;
void main() {
    gl_FragColor = vec4(vPosition.x * 0.2, vPosition.y * 0.2, vPosition.z * 0.2 , 1.0);
}