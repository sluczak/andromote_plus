var _ = require('lodash');
var FeatureFactory = require('../features/feature_factory');

function Andromote() {
    this.devices = [];
    this.features = [];

    Andromote.prototype.attachElements = function attachElements(configuration) {
        var self = this;
        _.forEach(configuration, function(entry) {
            entry.device.attach(entry.params);
            self.devices.push({name: entry.name, device: entry.device});
        });
    };

    Andromote.prototype.loadFeatures = function loadFeatures(features) {
        var self = this;
        _.forEach(features, function(entry) {
            self.features.push({name: entry.name, feature: entry.feature});
        });
    };

    Andromote.prototype.getElement = function getElement(elementName) {
        return _.find(this.devices, {'name': elementName}).device;
    };

    Andromote.prototype.feature = function feature(featureName) {
        return _.find(this.features, {'name': featureName}).feature;
    };
}

var andromote = new Andromote();
module.exports = andromote;