var MoveFeature = require('../features/move');

function FeatureFactory() {
    this.prototype.feature = function feature(featureName) {
        var feature;

        switch(featureName) {
            case 'move':
                feature = new MoveFeature();
                break;
            default:
                break;
        }
        return feature;
    }
}

module.exports = FeatureFactory;