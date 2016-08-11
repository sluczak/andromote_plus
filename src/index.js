var pigpio = require('pigpio');
var VNH2Driver = require('./devices/vnh2/vnh2_driver.js');
var Wheel = require('./devices/wheel.js');
var WheelEncoder = require('./devices/wheel_encoder.js');
var eventEmitter = require('./core/common_event_emitter');
var andromote = require('./setup/andromote');

pigpio.configureClock(5, pigpio.CLOCK_PCM);

var configuration = [
    {
        name: 'VNH2',
        device: new VNH2Driver(),
        params: {
            motor1Pinout : {pinA : 17, pinB : 2, pinPWM : 13},
            motor2Pinout : {pinA : 3, pinB : 27, pinPWM : 12}
        }
     },
    {
        name: 'encoder_1',
        device: new WheelEncoder('encoder_1'),
        params: {pinA : 16, pinB : 20}
    },
    {
        name: 'wheel',
        device: new Wheel(),
        params: {
            diameter: 60
        }
    }
];
andromote.attachElements(configuration);

var motorDriver = andromote.getElement('VNH2');
var wheel = andromote.getElement('wheel');

motorDriver.move({direction: 'forward', speed: 0.5});

var distanceCM = 100;
const limit = distanceCM * 10 / wheel.getPerimeter() * WheelEncoder.prototype.TICKS_PER_ROUND;

(function() {
    eventEmitter.on('encoder_1_tick', function(tickCount) {
        if(tickCount > limit) {
            motorDriver.stop();
        }
    });
}());

