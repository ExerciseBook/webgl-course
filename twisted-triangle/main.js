var gl_rotation;
var gl;
var center;

var max_depth = 6;

var iii = 0;

window.onload = function() {
    // Get A WebGL context
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("experimental-webgl");

    // setup a GLSL program
    var vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
    var fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    // set color
    //var colorLocation = gl.getUniformLocation(program, "u_color");

    // set the resolution
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    //console.log(canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    // Create a buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.enableVertexAttribArray(resolutionLocation);
    gl.vertexAttribPointer(resolutionLocation, 2, gl.FLOAT, false, 0, 0);

    // 旋转因子
    gl_rotation = gl.getUniformLocation(program, "multiplier");


    p1 = {x: -1 * 0.5, y: -1 * 0.5                  };
    p2 = {x:  1 * 0.5, y: -1 * 0.5                  };
    p3 = {x:  0 * 0.5, y: (Math.sqrt(3) - 1) * 0.5  };
    center = middle3(p1, p2, p3);
    drawing(1, p1, p2, p3);




    //setRotate(0 * 3.1415926535 / 180);
//
    //setTriangle(gl,
    //    -1, -1, 1, -1, 0, Math.sqrt(3) - 1,
    //);
//
    //gl.drawArrays(gl.TRIANGLES, 0, 3);

}

function setTriangle(gl, p1, p2, p3){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        p1.x, p1.y,
        p2.x, p2.y,
        p3.x, p3.y
        ]), gl.STATIC_DRAW);
}

function setRotate(rotation){
    gl.uniform2f(gl_rotation, Math.sin(rotation), Math.cos(rotation));
}

function middle2(p1, p2) {
    return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
}

function middle3(p1, p2, p3) {
    return {x: (p1.x + p2.x + p3.x) / 3, y: (p1.y + p2.y + p3.y) / 3}
}

function distance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function drawing(depth, p1, p2, p3) {
    // console.log(depth);

    if (depth < max_depth) {
        depth++;
        m1 = middle2(p1, p2);
        m3 = middle2(p3, p1);
        drawing(depth, p1, m1, m3);

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        drawing(depth, m1, p2, m2);

        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        drawing(depth, m3, m2, p3);

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        drawing(depth, m1, m2, m3);


    } else {
    
        iii++;
        console.log("A_" + iii + "=(" + p1.x + "," + p1.y + ")");
        console.log("B_" + iii + "=(" + p2.x + "," + p2.y + ")");
        console.log("C_" + iii + "=(" + p3.x + "," + p3.y + ")");
        
        M = middle3(p1, p2, p3);
        M = distance(center, M) * 64;

        setRotate(M * 3.1415926535 / 180);
        setTriangle(gl, p1, p2, p3);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }



}