precision mediump float;

uniform vec4 u_color;

varying vec2 v_position;

vec2 A = vec2(-1.0, -1.0);
vec2 B = vec2( 1.0, -1.0);
vec2 C = vec2( 0.0, sqrt(3.0) - 1.0);

void main() {
 // 0 到 2

    float a = 1.0 - (distance(v_position, A) / 2.0);
    float b = 1.0 - (distance(v_position, B) / 2.0);
    float c = 1.0 - (distance(v_position, C) / 2.0);


    gl_FragColor = vec4(a, b, c, 1);
}