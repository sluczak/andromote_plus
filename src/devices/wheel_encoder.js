var pigpio = require('pigpio');
var Gpio = pigpio.Gpio;
var eventEmitter = require('../core/common_event_emitter');

function WheelEncoder(identifier) {
    this.id = identifier;
    this.signalA;
    this.signalB;
    WheelEncoder.prototype.attach = function(encoderPinout) {
        console.log("Attaching Encoder " + this.id + " to GPIO");
        const alertedInput = {mode: Gpio.INPUT, alert: true};
        this.signalA = new Gpio(encoderPinout.pinA, alertedInput);
        this.signalB = new Gpio(encoderPinout.pinB, alertedInput);

        var self = this;
        (function () {
            var tickCount = 0;
            const eventId = self.id + '_tick';
            self.signalA.on('alert', function (level, tick) {
                if(level == 1) {
                    tickCount++;
                    eventEmitter.emit(eventId, tickCount);
                }
            });
        }());
    }
}

module.exports = WheelEncoder;
