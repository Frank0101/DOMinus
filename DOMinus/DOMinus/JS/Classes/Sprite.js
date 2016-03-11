DOMinus.Sprite = function (image) {
    var _self = this;

    //Public Properties
    var _image = new DOMinus.Value(image);
    _self.image = function (image) {
        if (image === undefined)
            return _image.value();
        else {
            _image.value(image);
            return _self;
        }
    };

    var _animationRow = new DOMinus.Value();
    _self.animationRow = function (animationRow) {
        if (animationRow === undefined)
            return _animationRow.value();
        else {
            _animationRow.value(animationRow);
            return _self;
        }
    };

    var _animationLength = new DOMinus.Value();
    _self.animationLength = function (animationLength) {
        if (animationLength === undefined)
            return _animationLength.value();
        else {
            _animationLength.value(animationLength);
            return _self;
        }
    };

    var _animationDelay = new DOMinus.Value();
    _self.animationDelay = function (animationDelay) {
        if (animationDelay === undefined)
            return _animationDelay.value();
        else {
            _animationDelay.value(animationDelay);
            return _self;
        }
    };

    var _currentFrame = new DOMinus.Value(0);
    _self.currentFrame = function (currentFrame) {
        if (currentFrame === undefined)
            return _currentFrame.value();
        else {
            _currentFrame.value(currentFrame);
            return _self;
        }
    };

    //Public Methods
    _self.setAnimation = function (row, length, delay) {
        _animationRow.value(row);
        _animationLength.value(length);
        _animationDelay.value(delay);
        _currentFrame.value(0);
        return _self;
    };

    _self.moveForward = function () {
        _currentFrame.value((_currentFrame.value() + 1)
            % _animationLength.value());
        return _self;
    };

    _self.hasImageValue = function () {
        return _image.hasValue();
    };

    _self.hasAnimationValue = function () {
        return _animationRow.hasValue()
            && _animationLength.hasValue()
            && _animationDelay.hasValue()
            && _currentFrame.hasValue();
    };

    _self.isImageChanged = function () {
        return _image.isChanged();
    };

    _self.isAnimationChanged = function () {
        return _animationRow.isChanged()
            || _currentFrame.isChanged();
    };

    _self.isChanged = function () {
        return _self.isImageChanged()
            || _self.isAnimationChanged();
    };

    _self.commitImage = function () {
        _image.commit();
        return _self;
    };

    _self.commitAnimation = function () {
        _animationRow.commit();
        _currentFrame.commit();
        return _self;
    };
};
