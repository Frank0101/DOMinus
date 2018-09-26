DOMinus.Vector2 = function (x, y) {
    var _self = this;

    //Public Properties
    var _x = new DOMinus.Value(x);
    _self.x = function (x) {
        if (x === undefined)
            return _x.value();
        else {
            _x.value(x);
            return _self;
        }
    };

    var _y = new DOMinus.Value(y);
    _self.y = function (y) {
        if (y === undefined)
            return _y.value();
        else {
            _y.value(y);
            return _self;
        }
    };

    //Public Methods
    _self.setXY = function (x, y) {
        _x.value(x); _y.value(y);
        return _self;
    };

    _self.sumXY = function (x, y) {
        _self.setXY(_x.value() + x, _y.value() + y);
        return _self;
    };

    _self.sumVector = function (vector) {
        _self.sumXY(vector.x(), vector.y());
        return _self;
    };

    _self.mulScalar = function (scalar) {
        _self.setXY(_x.value() * scalar, _y.value() * scalar);
        return _self;
    };

    _self.hasValue = function () {
        return _x.hasValue() && _y.hasValue();
    };

    _self.isXChanged = function () {
        return _x.isChanged();
    };

    _self.isYChanged = function () {
        return _y.isChanged();
    };

    _self.isChanged = function () {
        return _self.isXChanged() || _self.isYChanged();
    };

    _self.commitX = function () {
        _x.commit();
        return _self;
    };

    _self.commitY = function () {
        _y.commit();
        return _self;
    };

    _self.commit = function () {
        _self.commitX().commitY();
        return _self;
    };
};
