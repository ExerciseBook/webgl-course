/**
 * 参考 谢尔宾斯基四面体
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

    gl.enable(gl.DEPTH_TEST);

    // Create a buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(resolutionLocation);
    gl.vertexAttribPointer(resolutionLocation, 3, gl.FLOAT, false, 0, 0);
    
    O = {x: 0, y: 0, z: 0};

    p1 = {x: -1, y: -1,                   z: 0};
    p2 = {x: 1,  y: -1,                   z: 0}
    p3 = {x: 0,  y: Math.sqrt(3) - 1,     z: 0}
    p4 = {x: 0,  y: - 1 + 1 / Math.sqrt(3), z: 2 * Math.sqrt(2/3)}

    p1 = middle2(O, p1);
    p2 = middle2(O, p2);
    p3 = middle2(O, p3);
    p4 = middle2(O, p4);

    drawing(1, p1, p2, p3, p4);

    console.log(points);

    //设置视线
    const viewMatrix = new Matrix4();
    viewMatrix.setLookAt(-0.25, -0.75, 0,
        3, 3.5, 5,
        1, 2.5, -1);
    console.log(viewMatrix.elements);
    var ViewLocation = gl.getUniformLocation(program,"u_ViewMatrix");
    gl.uniformMatrix4fv(ViewLocation, false, viewMatrix.elements);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}


function middle2(p1, p2) {
    return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2};
}

function setTriangle(p1, p2, p3){
    points.push(p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z);
}

function drawing(depth, p1, p2, p3, p4) {
    if (depth < max_depth) {
        depth ++;

        m1 = middle2(p1, p2);
        m3 = middle2(p3, p1);
        m4 = middle2(p1, p4);
        drawing(depth, p1, m1, m3, m4);

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        m5 = middle2(p2, p4);
        drawing(depth, m1, p2, m2, m5);

        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        m6 = middle2(p3, p4);
        drawing(depth, m3, m2, p3, m6);

        m4 = middle2(p1, p4);
        m5 = middle2(p2, p4);
        m6 = middle2(p3, p4);
        drawing(depth, m4, m5, m6, p4);
    } else {
        iii++;
        console.log("A_" + iii + "=(" + p1.x + "," + p1.y + ")");
        console.log("B_" + iii + "=(" + p2.x + "," + p2.y + ")");
        console.log("C_" + iii + "=(" + p3.x + "," + p3.y + ")");
        console.log("D_" + iii + "=(" + p4.x + "," + p4.y + ")");

        setTriangle(p1, p2, p3);
        setTriangle(p4, p2, p3);
        setTriangle(p1, p4, p3);
        setTriangle(p1, p2, p4);
    }
}
