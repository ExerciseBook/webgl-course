/**
 * webgl 对象
 */
var gl;

/**
 * 颜色缓冲
 */
var colorLocation;


var vertexShader = undefined;
var fragmentShader = undefined;

/**
 * 俄罗斯方块屏幕信息
 */
var tetris_screen = {
    r: Array.apply(null, Array(16 + 3)).map((_, h) => Array.apply(null, Array(8)).map((_, h) => 0 ) ),
    g: Array.apply(null, Array(16 + 3)).map((_, h) => Array.apply(null, Array(8)).map((_, h) => 0 ) ),
    b: Array.apply(null, Array(16 + 3)).map((_, h) => Array.apply(null, Array(8)).map((_, h) => 0 ) ),
    // a: Array.apply(null, Array(16)).map((_, h) => Array.apply(null, Array(8)).map((_, h) => 0 ) ),
    s: Array.apply(null, Array(16 + 3)).map((_, h) => Array.apply(null, Array(8)).map((_, h) => 0 ) ),

    row: 16,
    col: 8,
};

var tetris_activated = {
    shape: Math.floor(Math.random() * 7),
    rotate: 0,
    x: 5,
    y: 5,
}


/**
 * 加载信息
 */
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

/**
 * 初始化入口
 */
function render_init() {
    if (vertexShader !== undefined && fragmentShader !== undefined) {
        registerWebGL();
        tetrisInit();
        regitserGameLoop();
    }
};


function registerWebGL() {
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
}

function setTriangle(gl, p1, p2, p3){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        p1.x, p1.y,
        p2.x, p2.y,
        p3.x, p3.y
        ]), gl.STATIC_DRAW);
}

function setSquare(gl, p1, p2, p3, p4, r, g, b, a){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        p1.x, p1.y,
        p2.x, p2.y,
        p3.x, p3.y,
        p4.x, p4.y,
        ]), gl.STATIC_DRAW);
        
    gl.uniform4f(colorLocation, r, g, b, a);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 8);
}

function gameloop(){
    // 渲染固定信息
    for (let i = 0; i < tetris_screen.row; i++) {
        for (let j = 0; j < tetris_screen.col; j++) {
            if (tetris_screen.s[i][j] != 0) {
                //       (i, j)    (i, j+1)
                //             +--+
                //             |  |
                //             +--+
                //     (i+1, j)    (i+1, j+1)

                setSquare(gl,
                    {x:i, y:j},
                    {x:i, y:j+1},
                    {x:i+1, y:j},
                    {x:i+1, y:j+1},
                    tetris_screen.r[i][j],
                    tetris_screen.g[i][j] ,
                    tetris_screen.b[i][j] ,
                    1 );

            }
        }
    }

    // 渲染非固定信息

    p1 = {x:Math.random() * 16, y:Math.random() * 8};
    p2 = {x:Math.random() * 16, y:Math.random() * 8};
    p3 = {x:Math.random() * 16, y:Math.random() * 8};

    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    setTriangle(gl, p1, p2, p3);
    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function regitserGameLoop(){
    window.setInterval(gameloop, 1000 / 60);
}

function tetrisInit(){

    tetris_screen.p = true;


    window.onkeydown = function (e) {
        //console.log(e.key, e.keyCode);
        // 上 87 38
        // 下 83 40
        // 左 65 37
        // 右 68 39
        // 空格 32
    }
}