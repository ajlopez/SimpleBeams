
function Beam(fn) {
    this.send = function (message) {
        fn(message);
    }
}

function createBeam(fn) {
    return new Beam(fn);
}

module.exports = {
    createBeam: createBeam
};