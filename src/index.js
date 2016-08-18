var _ = require('lodash');
var restify = require('restify');
var pigpio = require('pigpio');
var andromote = require('./core/andromote');
var features = require('./features/features');
var VNH2Driver = require('./devices/vnh2/vnh2_driver.js');
var Wheel = require('./devices/wheel.js');
var WheelEncoder = require('./devices/wheel_encoder.js');
var MoveFeatureFactory = require('./features/move');
var RotateFeatureFactory = require('./features/rotate');

pigpio.configureClock(5, pigpio.CLOCK_PCM);

var server = restify.createServer({
    name: 'Andromote'
});

server.use(restify.bodyParser({ }));

server.post('/do', function action(req, res, next) {
    try {
        execute(req.body.split("\n"));
        res.send(200);
    } catch (err) {
        res.send(400, err);
    }
    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

var configuration = [
    {
        name: 'drive',
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

function execute(commands) {
    _.forEach(commands, function(command) {
        console.log(command);
        andromote.exec(eval(command));
    });

};