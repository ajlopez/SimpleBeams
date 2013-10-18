
var sb = require('..');

exports['pipe to beam'] = function (test) {
    var counter = 0;
    
    var beam = sb.createBeam(function (x) { return x > 0; });
    beam.pipe(function (x) { counter += x; });
    
    beam.send(1);
    beam.send(2);
    
    test.equal(counter, 3);
}

exports['pipe to beams'] = function (test) {
    var counter = 0;
    
    var beam = sb.createBeam(function (x) { return x > 0; });
    beam.pipe(function (x) { counter += x });
    beam.pipe(function (x) { counter *= x });
    
    beam.send(1);
    beam.send(2);
    
    test.equal(counter, 6);
}

exports['pipe beams using next.send'] = function (test) {
    var result = null;
    
    var beam = sb.createBeam();
    beam.pipe(function (x) { return x % 2 == 0; }).pipe(function (x, next) { next.send(x / 2); }).pipe(function (x) { result = x });
    
    beam.send(1);
    test.equal(result, null);
    beam.send(2);
    test.equal(result, 1);
}

exports['pipe beams using next.post'] = function (test) {
    test.async();
    
    var beam = sb.createBeam();
    beam.pipe(function (x) { return x % 2 == 0; }).pipe(function (x, next) { next.post(x / 2); }).pipe(function (x) { test.equal(x, 1); test.done(); });
    beam.send(2);
}
