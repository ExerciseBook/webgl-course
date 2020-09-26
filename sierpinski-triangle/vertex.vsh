attribute vec2 a_position;

uniform vec2 u_resolution;

varying vec2 v_position;

void main() {
    v_position = a_position;
    gl_Position = vec4(a_position, 0, 1);
}