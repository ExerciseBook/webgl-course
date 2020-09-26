attribute vec2 a_position;
varying vec4 vColor;
uniform vec2 u_resolution;

void main() {
    gl_Position = vec4(a_position, 0, 1);
    vColor = vec4(0.12156862745098039215686274509804, 0.11764705882352941176470588235294, 0.2, 1.0);
}