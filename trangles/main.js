/**
 * 参考 谢尔宾斯基三角形
 */

max_depth = 5;
var gl;
var colorLocation;
var iii = 0;
var vertexShader = undefined;
var fragmentShader = undefined;


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
        url : "fragment.fsh", 
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

    // set color
    colorLocation = gl.getUniformLocation(program, "u_color");

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
}

function setTriangle(gl, p1, p2, p3){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        p1.x, p1.y,
        p2.x, p2.y,
        p3.x, p3.y
        ]), gl.STATIC_DRAW);
}

function middle2(p1, p2) {
    return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
}

function middle3(p1, p2, p3) {
    return {x: (p1.x + p2.x + p3.x) / 3, y: (p1.y + p2.y + p3.y) / 3}
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

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        drawing(depth + 1, 
            middle3(p1, m1, m3),
            middle3(m1, p2, m2),
            middle3(m3, m2, p3),
            );
    } else {
        //console.log({
        //    depth: depth,
        //    p1: p1,
        //    p2: p2,
        //    p3: p3
        //});
    
        iii++;
        console.log("A_" + iii + "=(" + p1.x + "," + p1.y + ")");
        console.log("B_" + iii + "=(" + p2.x + "," + p2.y + ")");
        console.log("C_" + iii + "=(" + p3.x + "," + p3.y + ")");

        M = middle3(p1, p2, p3);

        setTriangle(gl, p1, p2, M);
        gl.uniform4f(colorLocation, 0, 1, 0, 1);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        
        setTriangle(gl, p2, p3, M);
        gl.uniform4f(colorLocation, 0, 0, 1, 1);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        setTriangle(gl, p3, p1, M);
        gl.uniform4f(colorLocation, 1, 0, 0, 1);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }



}