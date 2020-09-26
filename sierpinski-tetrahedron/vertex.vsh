attribute vec3 a_position;

uniform vec2 u_resolution;
uniform mat4 u_ViewMatrix;

varying vec3 v_position;

void main() {
    v_position = a_position;
    gl_Position = u_ViewMatrix * vec4(a_position, 1);
    
}