var pigpio = require('pigpio');
var VNH2Driver = require('./devices/vnh2/vnh2_driver.js');
var WheelEncoder = require('./devices/wheel_encoder.js');
var eventEmitter = require('./core/common_event_emitter');

pigpio.configureClock(5, pigpio.CLOCK_PCM);

var motors = new VNH2Driver();
var encoder = new WheelEncoder(1);

const motor1Pinout = {pinA : 17, pinB : 2, pinPWM : 13};
const motor2Pinout = {pinA : 3, pinB : 27, pinPWM : 12};
const encoderPinout = {pinA : 16,pinB : 20};

const numberOfTicksPerRound = 82;
const perimeterMM = 188;
var distanceCM = 100;
const limit = distanceCM * 10 / perimeterMM * numberOfTicksPerRound;

(function() {
    eventEmitter.on('1_tick', function(tickCount) {
        if(tickCount > limit) {
            motors.move({speed: 0});
        }
    });
}());

motors.attach(motor1Pinout, motor2Pinout);
encoder.attach(encoderPinout);
motors.move({direction: 'forward', speed: 0.5});


