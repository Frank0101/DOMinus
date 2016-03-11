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
