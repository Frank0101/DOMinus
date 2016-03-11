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
