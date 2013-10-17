
var sb = require('..');

exports['create beam and send simple message'] = function (test) {
    var counter = 0;
    var beam = sb.createBeam(function (x) { counter += x; });
    test.ok(beam);
    beam.send(1);
    test.equal(counter, 1);
}

exports['create beam with filter and send simple message'] = function (test) {
    var counter = 0;
    var beam = sb.createBeam(function (x) { return x > 0; }, function (x) { counter += x; });
    test.ok(beam);
    beam.send(1);
    test.equal(counter, 1);
}

exports['create beam with filter and reject simple message'] = function (test) {
    var counter = 0;
    var beam = sb.createBeam(function (x) { return x % 2; }, function (x) { counter += x; });
    test.ok(beam);
    beam.send(2);
    test.equal(counter, 0);
}

exports['throw invalid arguments in none'] = function (test) {
    test.throws(
        function () {
            sb.createBeam();
        },
        function (err) {
            return err == 'invalid arguments';
        }
    );
}