
var sb = require('..');

exports['pipe to beam'] = function (test) {
    var counter = 0;
    
    var beam = sb.createBeam(function (x) { return x > 0; });
    beam.pipe(function (x) { counter += x });
    
    beam.send(1);
    beam.send(2);
    
    test.equal(counter, 3);
}
