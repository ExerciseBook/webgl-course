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

function debug(a_position) {
    cos = Math.cos;
    sin = Math.sin;

    console.log(
        "A_" + (iii++) + " = " +
        "(" +
        (1.0 * cos(a_position[1]) * cos(a_position[0])).toFixed(2) + ", " +
        (1.0 * sin(a_position[1])).toFixed(2) + ", " +
        (1.0 * cos(a_position[1]) * sin(a_position[0])).toFixed(2) +
        
        ") "
    );
}

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
    
    ///
    let points = [];

    let α = 0;
    let αsplit = 36;
    let βsplit = 72;

    while (α < αsplit) {
        let lower = α * Math.PI / αsplit - Math.PI / 2;
        let upper = (α + 1) * Math.PI / αsplit - Math.PI / 2;

        //console.log(α);
        //console.log(lower, upper);

        let β = 0;
        while (β < βsplit) {
            let left = β * 2 * Math.PI / βsplit;
            let right = (β + 1) * 2 * Math.PI / βsplit;

            //console.log(β);
            //console.log(left, right);

            //console.log(left, lower, right, lower, left, upper);
            //console.log(right, lower, left, upper, right, upper);
            
            points.push(left, lower, right, lower, left, upper);
            points.push(right, lower, left, upper, right, upper);

            //debug([left, lower]);

            // debug([left, lower]);
            // debug([right, lower]);
            // debug([left, upper]);

            // debug([right, lower]);
            // debug([left, upper]);
            // debug([right, upper]);

            β += 1;
        }

        α += 1;

        //console.log("--");
    }
    //console.log(points);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.uniform4f(colorLocation, 0, 0, 1, 1);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
