///#source 1 1 /DOMinus/JS/main.js
var DOMinus = {};

//Configuration
DOMinus.Config = {
    RENDER_LOOP_DELAY: 10
};

///#source 1 1 /DOMinus/JS/utils.js
DOMinus.Utils = {};

//Utils Methods
DOMinus.Utils.setCSSRule = function (domElement, ruleName, ruleValue) {
    if (ruleValue !== null && ruleValue !== undefined)
        domElement.css(ruleName, ruleValue);
    else
        domElement.css(ruleName, "");
};

//DOMinus.Utils.generateMatrix3D = function (position, scale, rotation) {
//    if (position.hasValue() || scale.hasValue() || rotation) {
//        var matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
//        matrix[0] = DOMinus.Utils.valueOrDefault(scale.x(), 1)
//            * Math.cos(DOMinus.Utils.valueOrDefault(rotation, 0) * Math.PI / 180);
//        matrix[1] = -Math.sin(DOMinus.Utils.valueOrDefault(rotation, 0) * Math.PI / 180);
//        matrix[4] = Math.sin(DOMinus.Utils.valueOrDefault(rotation, 0) * Math.PI / 180);
//        matrix[5] = DOMinus.Utils.valueOrDefault(scale.y(), 1)
//            * Math.cos(DOMinus.Utils.valueOrDefault(rotation, 0) * Math.PI / 180);
//        matrix[12] = DOMinus.Utils.valueOrDefault(position.x(), 0);
//        matrix[13] = DOMinus.Utils.valueOrDefault(position.y(), 0);
//        var matrixStr = "";
//        for (var n = 0; n < matrix.length; n++) {
//            if (n > 0) matrixStr += ",";
//            matrixStr += matrix[n];
//        }
//        return "matrix3d(" + matrixStr + ")";
//    }
//    else {
//        return null;
//    }
//};

//DOMinus.Utils.valueOrDefault = function (value, defaultValue) {
//    return value ? value : defaultValue;
//};

///#source 1 1 /DOMinus/JS/Classes/Engine.js
DOMinus.Engine = function (viewport) {
    var _self = this;
    var _children = [];
    var _interval = null;
    var _frame = 0;

    //Public Properties
    if (typeof viewport === "string")
        viewport = $(viewport);
    var _viewport = new DOMinus.Value(viewport);
    _self.viewport = function (viewport) {
        if (viewport === undefined)
            return _viewport.value();
        else {
            if (typeof viewport === "string")
                viewport = $(viewport);
            for (var n = 0; n < _children.length; n++) {
                _children[n].domParent(viewport);
            }
            _viewport.value(viewport);
            return _self;
        }
    };

    var _size = new DOMinus.Vector2();
    _self.size = function (x, y) {
        if (x === undefined || y === undefined)
            return _size;
        else {
            _size.setXY(x, y);
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

    //Public Methods
    _self.addChild = function (child) {
        child.domParent(_viewport.value());
        _children.push(child);
        return _self;
    };

    _self.removeChildAt = function (index) {
        _children[index].domParent(null);
        _children.splice(index, 1);
        return _self;
    };

    _self.getChildrenCount = function () {
        return _children.length;
    };

    _self.getChild = function (index) {
        return _children[index];
    };

    _self.render = function () {
        var forceUpdate = false;
        if (_viewport.isChanged()) {
            _viewport.value().addClass("dominus-viewport");
            forceUpdate = true;
            _viewport.commit();
        }
        if (forceUpdate || _size.isXChanged()) {
            DOMinus.Utils.setCSSRule(_viewport.value(), "width", _size.x());
            _size.commitX();
        }
        if (forceUpdate || _size.isYChanged()) {
            DOMinus.Utils.setCSSRule(_viewport.value(), "height", _size.y());
            _size.commitY();
        }
        if (forceUpdate || _color.isChanged()) {
            DOMinus.Utils.setCSSRule(_viewport.value(), "background-color", _color.value());
            _color.commit();
        }
        for (var n = 0; n < _children.length; n++) {
            _children[n].render(_frame);
        }
        _viewport.value().show();
        return _self;
    };

    _self.renderLoop = function (callback) {
        _interval = setInterval(function () {
            innerRenderLoop(callback);
        }, DOMinus.Config.RENDER_LOOP_DELAY);
        return _self;
    };

    //Private Methods
    function innerRenderLoop(callback) {
        _frame++;
        _self.render();
        if (callback) {
            if (!callback(_self, _frame)) {
                clearInterval(_interval);
            }
        }
    }
};

///#source 1 1 /DOMinus/JS/Classes/Node.js
DOMinus.Node = function () {
    var _self = this;
    var _children = [];

    //Public Properties
    var _domParent = new DOMinus.Value();
    _self.domParent = function (domParent) {
        if (domParent === undefined)
            return _domParent.value();
        else {
            _domParent.value(domParent);
            _self.domElement(null);
            return _self;
        }
    };

    var _domElement = new DOMinus.Value();
    _self.domElement = function (domElement) {
        if (domElement === undefined)
            return _domElement.value();
        else {
            for (var n = 0; n < _children.length; n++) {
                _children[n].domParent(domElement);
            }
            if (_domElement.hasValue())
                _domElement.value().remove();
            _domElement.value(domElement);
            return _self;
        }
    };

    var _size = new DOMinus.Vector2();
    _self.size = function (x, y) {
        if (x === undefined || y === undefined)
            return _size;
        else {
            _size.setXY(x, y);
            return _self;
        }
    };

    var _position = new DOMinus.Vector2();
    _self.position = function (x, y) {
        if (x === undefined || y === undefined)
            return _position;
        else {
            _position.setXY(x, y);
            return _self;
        }
    };

    var _positionInc = new DOMinus.Vector2();
    _self.positionInc = function (x, y) {
        if (x === undefined || y === undefined)
            return _positionInc;
        else {
            _positionInc.setXY(x, y);
            return _self;
        }
    };

    var _scale = new DOMinus.Vector2();
    _self.scale = function (x, y) {
        if (x === undefined || y === undefined)
            return _scale;
        else {
            _scale.setXY(x, y);
            return _self;
        }
    };

    var _scaleInc = new DOMinus.Vector2();
    _self.scaleInc = function (x, y) {
        if (x === undefined || y === undefined)
            return _scaleInc;
        else {
            _scaleInc.setXY(x, y);
            return _self;
        }
    };

    var _rotation = new DOMinus.Value();
    _self.rotation = function (rotation) {
        if (rotation === undefined)
            return _rotation.value();
        else {
            _rotation.value(rotation);
            return _self;
        }
    };

    var _rotationOrigin = new DOMinus.Vector2();
    _self.rotationOrigin = function (x, y) {
        if (x === undefined || y === undefined)
            return _rotationOrigin;
        else {
            _rotationOrigin.setXY(x, y);
            return _self;
        }
    };

    var _rotationInc = new DOMinus.Value();
    _self.rotationInc = function (rotationInc) {
        if (rotationInc === undefined)
            return _rotationInc.value();
        else {
            _rotationInc.value(rotationInc);
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

    var _opacity = new DOMinus.Value();
    _self.opacity = function (opacity) {
        if (opacity === undefined)
            return _opacity.value();
        else {
            _opacity.value(opacity);
            return _self;
        }
    };

    var _border = new DOMinus.Border();
    _self.border = function (thickness, color, radius) {
        if (thickness === undefined && color === undefined)
            return _border;
        else {
            _border.setBorder(thickness, color);
            if (radius !== undefined) {
                _border.radius(radius);
            }
            return _self;
        }
    };

    var _sprite = new DOMinus.Sprite();
    _self.sprite = function (image, row, length, delay) {
        if (image === undefined)
            return _sprite;
        else {
            _sprite.image(image);
            if (row !== undefined && length !== undefined && delay !== undefined) {
                _sprite.setAnimation(row, length, delay);
            }
            return _self;
        }
    };

    //Public Methods
    _self.setAsRectangle = function (x, y, width, height, borderColor) {
        return _self.position(x, y).size(width, height).border(1, borderColor, 0)
            .color("transparent");
    };

    _self.setAsFilledRectangle = function (x, y, width, height, borderColor, fillColor) {
        return _self.setAsRectangle(x, y, width, height, borderColor).color(fillColor);
    };

    _self.setAsCircle = function (x, y, radius, borderColor) {
        return _self.position(x - radius, y - radius).size(radius * 2, radius * 2)
            .border(1, borderColor, "50%").color("transparent");
    };

    _self.setAsFilledCircle = function (x, y, radius, borderColor, fillColor) {
        return _self.setAsCircle(x, y, radius, borderColor).color(fillColor);
    };

    _self.setAsLine = function (x1, y1, x2, y2, color) {
        var len = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var deg = x1 != x2
            ? Math.acos((x2 - x1) / len) * 360 / (Math.PI * 2)
            : Math.asin((y2 - y1) / len) * 360 / (Math.PI * 2);
        return _self.setAsFilledRectangle(x1, y1, len, 1, null, color)
            .rotationOrigin(0, 0).rotation(deg);
    };

    _self.addChild = function (child) {
        child.domParent(_domElement.value());
        _children.push(child);
        return _self;
    };

    _self.removeChildAt = function (index) {
        _children[index].domParent(null);
        _children.splice(index, 1);
        return _self;
    };

    _self.getChildrenCount = function () {
        return _children.length;
    };

    _self.getChild = function (index) {
        return _children[index];
    };

    _self.render = function (frame) {
        if (!_domElement.hasValue()) {
            _self.domElement($("<div class='node'/>"));
            _domParent.value().append(_domElement.value());
        }
        updateDom();
        applyIncrements(frame);
        for (var n = 0; n < _children.length; n++) {
            _children[n].render(frame);
        }
        return _self;
    };

    _self.animate = function (seconds, timingFunc, callback) {
        if (_self.isChanged()) {
            var transition = "all " + seconds + "s " + timingFunc;
            DOMinus.Utils.setCSSRule(_domElement.value(), "transition", transition);
            setTimeout(function () {
                updateDom();
                setTimeout(function () {
                    DOMinus.Utils.setCSSRule(_domElement.value(), "transition", null);
                    if (callback) {
                        setTimeout(function () {
                            callback();
                        }, 0);
                    }
                }, seconds * 1000);
            }, 0);
        }
        return _self;
    };

    _self.setSpin = function (spin) {
        if (spin) {
            _domElement.value().addClass("spin");
        }
        else {
            _domElement.value().removeClass("spin");
        }
    };

    _self.isChanged = function () {
        return _domElement.isChanged() || _size.isChanged() || _position.isChanged()
            || _scale.isChanged() || _rotation.isChanged() || _rotationOrigin.isChanged()
            || _color.isChanged() || _opacity.isChanged() || _border.isChanged()
            || _sprite.isChanged();
    };

    //Private Methods
    function updateDom() {
        var forceUpdate = false;
        if (_domElement.isChanged()) {
            forceUpdate = true;
            _domElement.commit();
        }
        if (forceUpdate || _size.isXChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "width", _size.x());
            _size.commitX();
        }
        if (forceUpdate || _size.isYChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "height", _size.y());
            _size.commitY();
        }
        if (forceUpdate || _position.isXChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "left", _position.x());
            _position.commitX();
        }
        if (forceUpdate || _position.isYChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "top", _position.y());
            _position.commitY();
        }
        if (forceUpdate || _scale.isChanged() || _rotation.isChanged()) {
            var transform = "";
            if (_scale.hasValue())
                transform += "scale(" + _scale.x() + "," + _scale.y() + ")";
            if (_rotation.hasValue())
                transform += "rotate(" + _rotation.value() + "deg)";
            DOMinus.Utils.setCSSRule(_domElement.value(), "transform", transform);
            _scale.commit();
            _rotation.commit();
        }
        if (forceUpdate || _rotationOrigin.isChanged()) {
            var rotationOrigin = "";
            if (_rotationOrigin.hasValue()) {
                rotationOrigin = _rotationOrigin.x() + "px " + _rotationOrigin.y() + "px";
            }
            DOMinus.Utils.setCSSRule(_domElement.value(), "transform-origin", rotationOrigin);
            _rotationOrigin.commit();
        }
        if (forceUpdate || _color.isChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "background-color", _color.value());
            _color.commit();
        }
        if (forceUpdate || _opacity.isChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "opacity", _opacity.value());
            _opacity.commit();
        }
        if (forceUpdate || _border.isBorderChanged()) {
            var border = "";
            if (_border.hasBorderValue()) {
                border = "solid " + _border.thickness() + "px " + _border.color();
            }
            DOMinus.Utils.setCSSRule(_domElement.value(), "border", border);
            _border.commitBorder();
        }
        if (forceUpdate || _border.isRadiusChanged()) {
            DOMinus.Utils.setCSSRule(_domElement.value(), "border-radius", _border.radius());
            _border.commitRadius();
        }
        if (forceUpdate || _sprite.isImageChanged()) {
            var backgroundImage = "";
            if (_sprite.hasImageValue()) {
                backgroundImage = "url(" + _sprite.image() + ")";
            }
            DOMinus.Utils.setCSSRule(_domElement.value(), "background-image", backgroundImage);
            _sprite.commitImage();
        }
        if (forceUpdate || _sprite.isAnimationChanged()) {
            var backgroundPosition = "";
            if (_sprite.hasAnimationValue()) {
                backgroundPosition += -(_sprite.currentFrame() * _size.x()) + "px ";
                backgroundPosition += -(_sprite.animationRow() * _size.y()) + "px";
            }
            DOMinus.Utils.setCSSRule(_domElement.value(), "background-position", backgroundPosition);
            _sprite.commitAnimation();
        }
    }

    function applyIncrements(frame) {
        if (_positionInc.hasValue())
            _position.sumVector(_positionInc);
        if (_scaleInc.hasValue())
            _scale.sumVector(_scaleInc);
        if (_rotationInc.hasValue())
            _rotation.sumValueObj(_rotationInc);
        if (_sprite.hasAnimationValue()) {
            if (frame % _sprite.animationDelay() === 0)
                _sprite.moveForward();
        }
    }
};

///#source 1 1 /DOMinus/JS/Classes/Border.js
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

///#source 1 1 /DOMinus/JS/Classes/Sprite.js
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

///#source 1 1 /DOMinus/JS/Classes/Vector2.js
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

///#source 1 1 /DOMinus/JS/Classes/Value.js
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

