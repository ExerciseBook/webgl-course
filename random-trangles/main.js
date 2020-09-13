window.onload = function() {
    // Get A WebGL context
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");

    // setup a GLSL program
    var vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
    var fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    // set color
    var colorLocation = gl.getUniformLocation(program, "u_color");

    // set the resolution
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    // Create a buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(resolutionLocation);
    gl.vertexAttribPointer(resolutionLocation, 2, gl.FLOAT, false, 0, 0);

    for (var ii = 0; ii < 6; ++ii) {
        setTriangle(gl,
            randomInt(300), randomInt(300),
            randomInt(300), randomInt(300),
            randomInt(300), randomInt(300)
        )

        // setPartOfTriColorEqTriangle(gl,(ii-3)/12,(ii-3)/12,1/12,ii%3)

        // Set a color.
        gl.uniform4f(colorLocation,
            ii % 3 == 0? 1 : 0,
            ii % 3 == 1? 1 : 0,
            ii % 3 == 2? 1 : 0,
            1);

        // Draw the rectangle.
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function setTriangle(gl, x1, y1, x2, y2, x3, y3){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y2,
        x3, y3,
        ]), gl.STATIC_DRAW);
}

//画三色等边三角形的三分之一部分
function setPartOfTriColorEqTriangle(gl, centerX, centerY, width, part){
    switch (part){
        case 0://red part
            setTriangle(gl,
                centerX, centerY,
                centerX,centerY+width*Math.sqrt(3)/3,
                centerX-width/2, centerY-width*Math.sqrt(3)/6)
            break;
        case 1://green part
            setTriangle(gl,
                 centerX,centerY,
                centerX+width/2,centerY-width*Math.sqrt(3)/6,
                centerX-width/2, centerY-width*Math.sqrt(3)/6)
            break;
        case 2://blue part
            setTriangle(gl,
                centerX,centerY,
                centerX,centerY+width*Math.sqrt(3)/3,
                centerX+width/2,centerY-width*Math.sqrt(3)/6)
            break;
    }
}