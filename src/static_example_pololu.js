var pigpio = require('pigpio');
var andromote = require('./core/andromote');
var features = require('./features/features');
var PololuDriver = require('./devices/pololu/pololu_driver.js');
var Wheel = require('./devices/wheel.js');
var WheelEncoder = require('./devices/wheel_encoder.js');
var MoveFeatureFactory = require('./features/move');
var RotateFeatureFactory = require('./features/rotate');

pigpio.configureClock(5, pigpio.CLOCK_PCM);

var configuration = [
    {
        name: 'drive',
        device: new PololuDriver(),
        params: {
            motor1Pinout : {pinA : 22, pinB : 24, pinPWM : 12},
            motor2Pinout : {pinA : 23, pinB : 25, pinPWM : 13}
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

var featuresConfig = [
    {
        name: 'move',
        feature: new MoveFeatureFactory('encoder_1')
    },
    {
        name: 'rotate',
        feature: new RotateFeatureFactory('encoder_1', 504)
    }
];

andromote.attachElements(configuration);
features.load(featuresConfig);


andromote.exec(features.get('move').forward(100));
andromote.exec(features.get('move').backward(100));
andromote.exec(features.get('rotate').left(180));
andromote.exec(features.get('rotate').right(180));