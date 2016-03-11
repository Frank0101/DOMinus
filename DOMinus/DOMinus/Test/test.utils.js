/// <reference path="../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../scripts/jasmine/jasmine.js" />
/// <reference path="../JS/DOMinus.js" />

describe("Utils", function () {
    it("It should be possible to set a CSS rule", function () {
        var domElement = $("<div class='node'/>");
        DOMinus.Utils.setCSSRule(domElement, "background-color", "red");
        expect(domElement.css("background-color")).toBe("red");

        DOMinus.Utils.setCSSRule(domElement, "background-color", null);
        expect(domElement.css("background-color")).toBe("");
    });
});
