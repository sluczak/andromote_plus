var _ = require('lodash');

function Features() {
    this.features = [];

    Features.prototype.clear = function clear() {
        this.features = [];
    };

    Features.prototype.load = function loadFeatures(features) {
        var self = this;
        _.forEach(features, function(entry) {
            self.features.push(entry);
        });
    };

    Features.prototype.get = function get(featureName) {
        var feat = _.find(this.features, {'name': featureName}).feature.create();
        return feat;
    };
}

var features = new Features();
module.exports = features;