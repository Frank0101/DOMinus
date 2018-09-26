DOMinus.Value = function (value) {
    var _self = this;
    var _changed = true;

    //Public Properties
    var _value = value;
    _self.value = function (value) {
        if (value === undefined)
            return _value;
        else {
            _value = value;
            _changed = true;
            return _self;
        }
    };

    //Public Methods
    _self.sumValue = function (value) {
        _self.value(_value + value);
        return _self;
    };
    _self.sumValueObj = function (valueObj) {
        _self.sumValue(valueObj.value());
        return _self;
    };

    _self.hasValue = function () {
        return _value !== null
            && _value !== undefined;
    };

    _self.isChanged = function () {
        return _changed;
    };

    _self.commit = function () {
        _changed = false;
        return _self;
    };
};
