var mocha = require('mocha');

module.exports = MyReporter;

  function MyReporter( callback,runner) {
    try{
        var result  = [];
        mocha.reporters.Base.call(this, runner);

        var passes = 0;
        var failures = 0;
        runner.on('pass', function (test) {
            passes++;
            var ress = {pass: test.title};
            result.push(ress);
        });

        runner.on('fail', function (test, err) {
            failures++;
            var ress = {fail: test.title};
            result.push(ress);
        });

        runner.on('end', function () {

            var ress = {total: passes + failures,  passes: passes , failures: failures};
            result.push(ress);
            callback(result)
        });

    } catch (e) {

    }

}
