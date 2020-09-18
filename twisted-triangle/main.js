var gl_rotation;
var gl;
var center;

var max_depth = 6;

var points = [];
var angle = 48 * 3.1415926535 / 180;
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

    // set the resolution
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    // Create a buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.enableVertexAttribArray(resolutionLocation);
    gl.vertexAttribPointer(resolutionLocation, 2, gl.FLOAT, false, 0, 0);

    // 创建点列表
    p1 = {x: -1 * 0.5, y: -1 * 0.5                  };
    p2 = {x:  1 * 0.5, y: -1 * 0.5                  };
    p3 = {x:  0 * 0.5, y: (Math.sqrt(3) - 1) * 0.5  };
    center = middle3(p1, p2, p3);
    tessellation(1, p1, p2, p3);

    console.log(points);

    // 让 WebGL 将他们连起来
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);

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

function tessellation(depth, p1, p2, p3) {
    // console.log(depth);

    if (depth < max_depth) {
        depth++;

        m1 = middle2(p1, p2);
        m3 = middle2(p3, p1);
        tessellation(depth, p1, m1, m3);

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        tessellation(depth, m1, p2, m2);

        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        tessellation(depth, m3, m2, p3);

        m1 = middle2(p1, p2);
        m2 = middle2(p2, p3);
        m3 = middle2(p3, p1);
        tessellation(depth, m1, m2, m3);
    } else {
        p1 = twist(p1);
        p2 = twist(p2);
        p3 = twist(p3);
        points.push(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    }

}

function twist(vector){
    var x = vector.x,
        y = vector.y,
        d = Math.sqrt(x * x + y * y),
        sinAngle = Math.sin(d * angle),
        cosAngle = Math.cos(d * angle);

        /*
            x' = x cos(d0) - y sin(d0)
            y' = x sin(d0) + y cos(d0)

        */

        return [x * cosAngle - y * sinAngle, x * sinAngle + y * cosAngle];
}
