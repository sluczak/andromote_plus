var eventEmitter = require('../core/common_event_emitter');
var andromote = require('../core/andromote');

function RotateFeatureFactory(encoderName, numberOfStepsFullTurn) {
    this.encoderName = encoderName;
    this.numberOfStepsFullTurn = numberOfStepsFullTurn;

    RotateFeatureFactory.prototype.create = function create() {
        return new RotateFeature(this.encoderName, this.numberOfStepsFullTurn);
    }
}

function RotateFeature(encoderName, numberOfStepsFullTurn) {
    this.encoderName = encoderName;
    this.numberOfStepsFullTurn = numberOfStepsFullTurn;
    this.execute = undefined;

    RotateFeature.prototype.left = function left(angle) {
        this.performRotate('left', angle);
        return this;
    };

    RotateFeature.prototype.right = function right(angle) {
        this.performRotate('right', angle);
        return this;
    };

    RotateFeature.prototype.performRotate = function performRotate(direction, degrees) {
        console.log('rotate ' + direction + " " + degrees + " degrees");
        var self = this;
        this.execute = function execute(guid) {
            self.wheel = andromote.getElement('wheel');
            self.encoder = andromote.getElement(encoderName);
            self.motorDriver = andromote.getElement('drive');

            var start = self.encoder.getCurrentTick();
            var end = start + normalize(degrees, self);
            console.log('start ' + start + " end " + end);
            eventEmitter.on(self.encoderName + '_tick', function onTick(tickCount) {
                if(tickCount > end) {
                    self.motorDriver.stop();
                    eventEmitter.emit('done_' + guid);
                    eventEmitter.removeListener(self.encoderName + '_tick', onTick);
                }
            });
            self.motorDriver.move({direction: direction, speed: 0.5});
        };

        function normalize(degrees, self) {
            return self.numberOfStepsFullTurn / 360 * degrees;
        }
    }
}

module.exports = RotateFeatureFactory;