var test = require('./tests');
for (var key in test) {
    console.log('testing ' + key);
    var tests = test[key].tests;
    for (var singleTest in tests) {
        var testString = (tests[singleTest].exec).toString();
        var bodyString = testString.split('/*')[1].split('*/')[0];
        var wrappedString ='function foo () {' + bodyString + '} foo();';
        try {
            eval(wrappedString);
            console.log('passed: ' + singleTest);
        } catch (e) {
            console.log('failed: ' + singleTest);
            console.error(e);
        }
    }
}
