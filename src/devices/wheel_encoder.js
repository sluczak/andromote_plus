var pigpio = require('pigpio');
var Gpio = pigpio.Gpio;
var eventEmitter = require('../core/common_event_emitter');

function WheelEncoder(identifier) {
    WheelEncoder.prototype.TICKS_PER_ROUND = 82;

    console.log("Encoder " + identifier + " ready to be attached");
    this.id = identifier;

    WheelEncoder.prototype.attach = function(encoderPinout) {
        console.log("Attaching Encoder " + this.id + " to GPIO -=");
        console.log(encoderPinout);
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
