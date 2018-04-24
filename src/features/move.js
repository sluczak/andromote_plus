var eventEmitter = require('../core/common_event_emitter');
var andromote = require('../core/andromote');

function MoveFeatureFactory(encoderName) {
    this.encoderName = encoderName;

    MoveFeatureFactory.prototype.create = function create() {
        return new MoveFeature(encoderName);
    }
}

function MoveFeature(encoderName) {
    this.encoderName = encoderName;
    this.execute = undefined;

    MoveFeature.prototype.forward = function forward(distance) {
        this.performMove('forward', distance);
        return this;
    };

    MoveFeature.prototype.backward = function backward(distance) {
        this.performMove('backward', distance);
        return this;
    };

    MoveFeature.prototype.stop = function stop() {
        this.motorDriver.stop();
        return this;
    };

    MoveFeature.prototype.performMove = function performMove(direction, distance) {
        console.log('move ' + direction + " " + distance);
        var self = this;
        this.execute = function execute(guid) {
            self.wheel = andromote.getElement('wheel');
            self.encoder = andromote.getElement(this.encoderName);
            self.motorDriver = andromote.getElement('drive');

            var start = self.encoder.getCurrentTick();
            var end = start + normalize(distance, self);
            // console.log('start ' + start + " end " + end);
            eventEmitter.on(self.encoderName + '_tick', function onTick(tickCount) {
                if(tickCount > end) {
                    self.motorDriver.stop();
                    eventEmitter.emit('done_' + guid);
                    eventEmitter.removeListener(self.encoderName + '_tick', onTick);
                }
            });
            self.motorDriver.move({direction: direction, speed: 0.5});
        };

        function normalize(distanceCM, self) {
            return distanceCM * 10 / self.wheel.getPerimeter() * self.encoder.TICKS_PER_ROUND;
        }
    }
}

module.exports = MoveFeatureFactory;