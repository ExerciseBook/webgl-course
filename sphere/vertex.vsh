attribute vec2 a_position;

uniform vec2 u_resolution;

void main() {
    
    gl_Position = vec4(
        1.0 * cos(a_position[1]) * cos(a_position[0]),
        1.0 * sin(a_position[1]),
        1.0 * cos(a_position[1]) * sin(a_position[0]),
        1);

    // gl_Position = vec4(a_position[0], a_position[1], 0, 1);
}