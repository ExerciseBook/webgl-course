precision mediump float;

uniform vec4 u_color;

varying vec3 v_position;

vec3 A = vec3(-1.0, -1.0                 , 0);
vec3 B = vec3( 1.0, -1.0                 , 0);
vec3 C = vec3( 0.0, sqrt(3.0) - 1.0      , 0);
vec3 D = vec3( 0.0, 1.0 - 1.0 / sqrt(3.0), 2.0 * sqrt(2.0/3.0));

void main() {
    mediump float d = distance(v_position, D) / 2.0;

    mediump float a = distance(v_position, A) / 2.0 * d;
    mediump float b = distance(v_position, B) / 2.0 * d;
    mediump float c = distance(v_position, C) / 2.0 * d;

    gl_FragColor = vec4(a, b, c, 1);
}