
function Beam(fn1, fn2) {
    var filter = null;
    var transform = null;
    
    var beams = [];
    
    var next = {
        send: function (message) { emit(message); }
    }
    
    if (fn1)
        if (fn1.length == 2)
            transform = fn1;
        else
            filter = fn1;
        
    if (fn2)
        if (fn2.length == 2 || filter)
            transform = fn2;
        else
            filter = fn2;
    
    this.send = function (message) {
        if (filter && !filter(message))
            return;
        
        if (transform) {
            transform(message, next);
            return;
        }
        
        emit(message);
    }
    
    this.pipe = function (beam) {
        if (typeof beam === 'function')
            beam = new Beam(beam);
        beams.push(beam);
        return beam;
    }
    
    function emit(message) {
        beams.forEach(function (beam) {
            beam.send(message);
        });
    }
}

function createBeam(fn1, fn2) {
    return new Beam(fn1, fn2);
}

module.exports = {
    createBeam: createBeam
};

