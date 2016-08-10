var commonEventEmitter = new (require('events').EventEmitter)();

function emit() {
    eventEmitter.emit(arguments);
}

function on(name, callback) {
    eventEmitter.on(name, callback);
}

module.exports = commonEventEmitter ;