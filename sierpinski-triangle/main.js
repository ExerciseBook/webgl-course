/**
 * 参考 谢尔宾斯基三角形
 */

max_depth = 5;
var gl;
var iii = 0;
var vertexShader = undefined;
var fragmentShader = undefined;

var points = [];

window.onload = function () {
    KicoNetwork.Ajax({
        url : "vertex.vsh", 
        success: function (req, data){
            vertexShader = data;
            render_init();
        },
        failed: function (req){
            location.reload();
        }
    });

    KicoNetwork.Ajax({
        url : Math.random() > 0.5 ? "fragment.fsh" : "fragment-2.fsh", 
        success: function (req, data){
            fragmentShader = data;
            render_init();
        },
        failed: function (req){
            location.reload();
        }
    });
    
}

function render_init() {
    if (vertexShader !== undefined && fragmentShader !== undefined)
        main();
};


function main() {
    // Get A WebGL context
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("experimental-webgl");

    // setup a GLSL program
    vertexShader = loadShader(gl, vertexShader,  gl.VERTEX_SHADER, undefined);
    fragmentShader = loadShader(gl, fragmentShader,  gl.FRAGMENT_SHADER, undefined);
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    // set the resolution
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    // Create a buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(resolutionLocation);
    gl.vertexAttribPointer(resolutionLocation, 2, gl.FLOAT, false, 0, 0);
    
    p1 = {x:-1, y:-1};
    p2 = {x:1,  y:-1}
    p3 = {x:0,  y:Math.sqrt(3) - 1}
    drawing(1, p1, p2, p3);

    console.log(points);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

function setTriangle(p1, p2, p3){
    points.push(p1.x, p1.y,
        p2.x, p2.y,
        p3.x, p3.y);
}

function middle2(p1, p2) {
    return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
}

function drawing(depth, p1, p2, p3) {
    if (depth < max_depth) {
        m1 = middle2(p1, p2);
        m3 = middle2(p3, p1);
        drawing(depth + 1, p1, m1, m3);

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        drawing(depth + 1, m1, p2, m2);

        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        drawing(depth + 1, m3, m2, p3);

    } else {
    
        iii++;
        console.log("A_" + iii + "=(" + p1.x + "," + p1.y + ")");
        console.log("B_" + iii + "=(" + p2.x + "," + p2.y + ")");
        console.log("C_" + iii + "=(" + p3.x + "," + p3.y + ")");

        setTriangle(p1, p2, p3);
    }
}