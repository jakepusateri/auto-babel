module.exports = {
    "es6.spread": {
        "tests": {
            'with arrays, in function calls': {
                exec: function () {/*
                                     return Math.max(...[1, 2, 3]) === 3
                                   */},
            }
        }
    },
    "es6.blockScoping": {
        "tests": {
            'basic const support': {
                exec: function () {/*
                                    const foo = 123;
                                    return (foo === 123);
                                  */},
            },
            'basic let support': {
                exec: function () {/*
                                    let foo = 123;
                                    return (foo === 123);
                                  */},
            }

        }
    }
};
