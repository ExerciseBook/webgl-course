attribute vec2 a_position;

uniform vec2 u_resolution;

void main() {
    // a_position[0] = 0..15 1..16
    // a_position[1] = 0..7  1..8
    gl_Position = vec4(
            a_position[1] / 4.0 - 1.0,
            a_position[0] / 8.0 - 1.0,
            0,
            1
        );
}