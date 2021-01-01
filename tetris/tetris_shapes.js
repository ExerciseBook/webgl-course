
/**
 * 俄罗斯方块 方块描述
 * 
 *   0 1 2 3
 * 0
 * 1
 * 2
 * 3
 */
tetris_shapes = [
    [
        {
            // XX 
            // XX
            width: 2,
            height: 2,
            shape: [
                [0, 0], [0, 1], [1, 0], [1, 1]
            ]
        },
    ], 
    [
        {
            // X
            // X
            // X
            // X
            width: 1,
            height: 4,
            shape: [
                [0, 0], [1, 0], [2, 0], [3, 0]
            ]
        }, 
        {
            // XXXX
            width: 4,
            height: 1,
            shape: [
                [0, 0], [0, 1], [0, 2], [0, 3]
            ]
        },
    ],
    [
        {
            // XX
            //  XX
            width: 3,
            height: 2,
            shape: [
                [0, 0], [0, 1], [1, 1], [1, 2]
            ]
        },
        {
            //  X
            // XX
            // X
            width: 2,
            height: 3,
            shape: [
                [0, 1], [1, 0], [1, 1], [2, 0]
            ]
        }
    ],
    [
        {
            //  XX
            // XX
            width: 3,
            height: 2,
            shape: [
                [0, 1], [0, 2], [1, 0], [1, 1]
            ]
        },{
            // X
            // XX
            //  X
            width: 2,
            height: 3,
            shape: [
                [0, 0], [1, 0], [1, 1], [2, 1]
            ]
        }
    ],
    [
        {
            //  X 
            // XXX
            width: 3,
            height: 2,
            shape: [
                [0, 1], [1, 0], [1, 1], [1, 2]
            ]
        },
        {
            // X 
            // XX
            // X
            width: 2,
            height: 3,
            shape: [
                [0, 0], [1, 0], [1, 1], [2, 1]
            ]
        },
        {
            // XXX 
            //  X
            width: 3,
            height: 2,
            shape: [
                [0, 0], [0, 1], [0, 2], [1, 1]
            ]
        },
        {
            //  X 
            // XX
            //  X
            width: 2,
            height: 3,
            shape: [
                [0, 1], [1, 0], [1, 1], [2, 1]
            ]
        }
    ],
    [
        {
            // X
            // X
            // XX
            width: 2,
            height: 3,
            shape: [
                [0, 0], [1, 0], [2, 0], [2, 1]
            ]
        },
        {
            // XXX
            // X
            width: 3,
            height: 2,
            shape: [
                [0, 0], [0, 1], [0, 2], [1, 0]
            ]
        },
        {
            // XX
            //  X
            //  X
            width: 2,
            height: 3,
            shape: [
                [0, 0], [0, 1], [1, 1], [2, 1]
            ]
        },
        {
            //   X
            // XXX
            width: 3,
            height: 2,
            shape: [
                [0, 2], [1, 0], [1, 1], [1, 2]
            ]
        }
    ],
    [
        {
            //  X
            //  X
            // XX
            width: 2,
            height: 3,
            shape: [
                [0, 1], [1, 1], [2, 0], [2, 1]
            ]
        },
        {
            // X
            // XXX
            width: 3,
            height: 2,
            shape: [
                [0, 0], [1, 0], [1, 1], [1, 2]
            ]
        },
        {
            // XX
            // X
            // X
            width: 2,
            height: 3,
            shape: [
                [0, 0], [0, 1], [1, 0], [2, 0]
            ]
        },
        {
            // XXX
            //   X
            width: 3,
            height: 2,
            shape: [
                [0, 0], [0, 1], [0, 2], [1, 2]
            ]
        },
    ]
]

