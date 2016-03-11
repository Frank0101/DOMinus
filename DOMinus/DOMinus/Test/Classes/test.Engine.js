/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../JS/DOMinus.js" />

describe("Engine Class", function () {
    var model;

    beforeEach(function () {
        model = new DOMinus.Engine();
    });

    it("It should be possible to set the viewport", function () {
        var viewport = $("<div id='viewport'/>");
        model.viewport(viewport);
        expect(model.viewport()).toBe(viewport);
    });

    it("It should be possible to set the size", function () {
        model.size(2, 4);
        expect(model.size().x()).toBe(2);
        expect(model.size().y()).toBe(4);
    });

    it("It should be possible to set the color", function () {
        model.color("red");
        expect(model.color()).toBe("red");
    });

    it("It should be possible to add a child", function () {
        var child1 = new DOMinus.Node();
        var child2 = new DOMinus.Node();

        model.addChild(child1);
        expect(model.getChildrenCount()).toBe(1);

        model.addChild(child2);
        expect(model.getChildrenCount()).toBe(2);
    });

    it("It should be possible to remove a child", function () {
        var child1 = new DOMinus.Node();
        var child2 = new DOMinus.Node();

        model.addChild(child1).addChild(child2);
        model.removeChildAt(0);
        expect(model.getChildrenCount()).toBe(1);
        expect(model.getChild(0)).toBe(child2);

        model.removeChildAt(0);
        expect(model.getChildrenCount()).toBe(0);
    });

    it("It should set the children's DOM parent after updating the parent viewport", function () {
        var child = new DOMinus.Node();
        model.addChild(child);

        var viewport = $("<div id='viewport'/>");
        model.viewport(viewport);
        expect(child.domParent()).toBe(viewport);
    });

    it("It should set the children's DOM parent after adding to the parent", function () {
        var viewport = $("<div id='viewport'/>");
        model.viewport(viewport);

        var child = new DOMinus.Node();
        model.addChild(child);
        expect(child.domParent()).toBe(viewport);
    });

    it("It should clear the children's DOM parent after removing from the parent", function () {
        var viewport = $("<div id='viewport'/>");
        model.viewport(viewport);

        var child = new DOMinus.Node();
        model.addChild(child);
        model.removeChildAt(0);
        expect(child.domParent()).toBeNull();
    });

    it("It should be able to render the size", function () {
        var viewport = $("<div id='viewport'/>");
        model.viewport(viewport);
        model.size(10, 20);
        model.render();
        expect(viewport.css("width")).toBe("10px");
        expect(viewport.css("height")).toBe("20px");
    });

    it("It should be able to render the color", function () {
        var viewport = $("<div id='viewport'/>");
        model.viewport(viewport);
        model.color("red");
        model.render(1);
        expect(viewport.css("background-color")).toBe("red");
    });
});
