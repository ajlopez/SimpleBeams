
function Beam(fn1, fn2) {
    var filter = null;
    var transform = null;
    
    if (fn1 && fn2) {
        filter = fn1;
        transform = fn2;
    }
    else
        transform = fn1;
    
    this.send = function (message) {
        if (filter && !filter(message))
            return;
            
        transform(message);
    }
}

function createBeam(fn1, fn2) {
    return new Beam(fn1, fn2);
}

module.exports = {
    createBeam: createBeam
};