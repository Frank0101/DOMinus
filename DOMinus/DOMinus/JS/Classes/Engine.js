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
