
var sb = require('..');

exports['pipe to beam'] = function (test) {
    var counter = 0;

    test.async();
    
    var beam = sb.createBeam(function (x) { return x > 0; });
    beam.pipe(function (x) { 
        counter += x; 
        
        if (counter == 3)
            test.done();
    });
    
    beam.post(1);
    beam.post(2);
}

exports['pipe to beams'] = function (test) {
    var counter = 0;
    test.async();
    
    var beam = sb.createBeam(function (x) { return x > 0; });
    beam.pipe(function (x) { counter += x });
    beam.pipe(function (x) { counter *= x });
    
    beam.post(1);
    beam.post(2);
    
    setTimeout(function () {
        test.equal(counter, 6);
        test.done();
    }, 200);
}

exports['pipe beams using next'] = function (test) {
    test.async();
    
    var beam = sb.createBeam();
    beam.pipe(function (x) { return x % 2 == 0; }).pipe(function (x, next) { next.send(x / 2); }).pipe(function (x) { test.equal(x, 1); test.done(); });
    
    beam.post(2);
}

exports['pipe beams using next with post'] = function (test) {
    test.async();
    
    var beam = sb.createBeam();
    beam.pipe(function (x) { return x % 2 == 0; }).pipe(function (x, next) { next.post(x / 2); }).pipe(function (x) { test.equal(x, 1); test.done(); });
    
    beam.post(2);
}
