var restify = require('restify');
var pigpio = require('pigpio');
var andromote = require('./core/andromote');
var features = require('./features/features');

pigpio.configureClock(5, pigpio.CLOCK_PCM);

var server = restify.createServer({
    name: 'Andromote'
});

server.use(restify.bodyParser({ }));

server.post('/do', function action(req, res, next) {
    console.log(req.body);
    try {
        execute(req.body);
        res.send(200);
    } catch (err) {
        res.send(400, err);
    }
    return next();
});

server.post('/devices', function action(req, res, next) {
    console.log(req.body);
    try {
        andromote.clearDevices();
        andromote.attachElements(req.body);
        res.send(200);
    } catch (err) {
        res.send(400, err);
    }
    return next();
});

server.post('/features', function action(req, res, next) {
    console.log(req.body);
    try {
        features.clear();
        features.load(req.body);
        res.send(200);
    } catch (err) {
        res.send(400, err);
    }
    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

function execute(args) {
    eval(args);
};
