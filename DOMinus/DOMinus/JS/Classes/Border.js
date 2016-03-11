DOMinus.Border = function () {
    var _self = this;

    //Public Properties
    var _thickness = new DOMinus.Value(1);
    _self.thickness = function (thickness) {
        if (thickness === undefined)
            return _thickness.value();
        else {
            _thickness.value(thickness);
            return _self;
        }
    };

    var _color = new DOMinus.Value();
    _self.color = function (color) {
        if (color === undefined)
            return _color.value();
        else {
            _color.value(color);
            return _self;
        }
    };

    var _radius = new DOMinus.Value();
    _self.radius = function (radius) {
        if (radius === undefined)
            return _radius.value();
        else {
            _radius.value(radius);
            return _self;
        }
    };

    //Public Methods
    _self.setBorder = function (thickness, color) {
        _thickness.value(thickness);
        _color.value(color);
    };

    _self.hasBorderValue = function () {
        return _thickness.hasValue() && _color.hasValue();
    };

    _self.hasRadiusValue = function () {
        return _radius.hasValue();
    };

    _self.isBorderChanged = function () {
        return _thickness.isChanged() || _color.isChanged();
    };

    _self.isRadiusChanged = function () {
        return _radius.isChanged();
    };

    _self.isChanged = function () {
        return _self.isBorderChanged() || _self.isRadiusChanged();
    };

    _self.commitBorder = function () {
        _thickness.commit(); _color.commit();
        return _self;
    };

    _self.commitRadius = function () {
        _radius.commit();
    };
};
