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
    
    setTriangle(gl, p1, p2, p3);
    gl.uniform4f(colorLocation, 0, 0, 1, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}

function setTriangle(gl, p1, p2, p3){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        p1.x, p1.y,
        p2.x, p2.y,
        p3.x, p3.y
        ]), gl.STATIC_DRAW);
}


