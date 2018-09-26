/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../JS/DOMinus.js" />

describe("Node Class", function () {
    var model;

    beforeEach(function () {
        model = new DOMinus.Node();
    });

    it("It should be possible to set the DOM parent", function () {
        var domParent = $("<div class='node'/>");
        model.domParent(domParent);
        expect(model.domParent()).toBe(domParent);
    });

    it("It should be possible to set the DOM element", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        expect(model.domElement()).toBe(domElement);
    });

    it("It should be possible to set the size", function () {
        model.size(2, 4);
        expect(model.size().x()).toBe(2);
        expect(model.size().y()).toBe(4);
    });

    it("It should be possible to set the position", function () {
        model.position(2, 4);
        expect(model.position().x()).toBe(2);
        expect(model.position().y()).toBe(4);
    });

    it("It should be possible to set the position increment", function () {
        model.positionInc(2, 4);
        expect(model.positionInc().x()).toBe(2);
        expect(model.positionInc().y()).toBe(4);
    });

    it("It should be possible to set the scale", function () {
        model.scale(2, 4);
        expect(model.scale().x()).toBe(2);
        expect(model.scale().y()).toBe(4);
    });

    it("It should be possible to set the scale increment", function () {
        model.scaleInc(2, 4);
        expect(model.scaleInc().x()).toBe(2);
        expect(model.scaleInc().y()).toBe(4);
    });

    it("It should be possible to set the rotation", function () {
        model.rotation(2);
        expect(model.rotation()).toBe(2);
    });

    it("It should be possible to set the rotation origin", function () {
        model.rotationOrigin(2, 4);
        expect(model.rotationOrigin().x()).toBe(2);
        expect(model.rotationOrigin().y()).toBe(4);
    });

    it("It should be possible to set the rotation increment", function () {
        model.rotationInc(2);
        expect(model.rotationInc()).toBe(2);
    });

    it("It should be possible to set the color", function () {
        model.color("red");
        expect(model.color()).toBe("red");
    });

    it("It should be possible to set the opacity", function () {
        model.opacity(0.5);
        expect(model.opacity()).toBe(0.5);
    });

    it("It should be possible to set the border", function () {
        model.border(3, "red", "50%");
        expect(model.border().thickness()).toBe(3);
        expect(model.border().color()).toBe("red");
        expect(model.border().radius()).toBe("50%");
    });

    it("It should be possible to set the sprite", function () {
        model.sprite("image.png", 1, 2, 3);
        expect(model.sprite().image()).toBe("image.png");
        expect(model.sprite().animationRow()).toBe(1);
        expect(model.sprite().animationLength()).toBe(2);
        expect(model.sprite().animationDelay()).toBe(3);
    });

    it("It should be possible to quick set as a rectangle", function () {
        model.setAsRectangle(50, 60, 100, 120, "red");
        expect(model.position().x()).toBe(50);
        expect(model.position().y()).toBe(60);
        expect(model.size().x()).toBe(100);
        expect(model.size().y()).toBe(120);
        expect(model.border().thickness()).toBe(1);
        expect(model.border().color()).toBe("red");
        expect(model.border().radius()).toBe(0);
        expect(model.color()).toBe("transparent");
    });

    it("It should be possible to quick set as a filled rectangle", function () {
        model.setAsFilledRectangle(50, 60, 100, 120, "red", "blue");
        expect(model.position().x()).toBe(50);
        expect(model.position().y()).toBe(60);
        expect(model.size().x()).toBe(100);
        expect(model.size().y()).toBe(120);
        expect(model.border().thickness()).toBe(1);
        expect(model.border().color()).toBe("red");
        expect(model.border().radius()).toBe(0);
        expect(model.color()).toBe("blue");
    });

    it("It should be possible to quick set as a circle", function () {
        model.setAsFilledCircle(150, 200, 100, "red");
        expect(model.position().x()).toBe(50);
        expect(model.position().y()).toBe(100);
        expect(model.size().x()).toBe(200);
        expect(model.size().y()).toBe(200);
        expect(model.border().thickness()).toBe(1);
        expect(model.border().color()).toBe("red");
        expect(model.border().radius()).toBe("50%");
        expect(model.color()).toBe("transparent");
    });

    it("It should be possible to quick set as a filled circle", function () {
        model.setAsFilledCircle(150, 200, 100, "red", "blue");
        expect(model.position().x()).toBe(50);
        expect(model.position().y()).toBe(100);
        expect(model.size().x()).toBe(200);
        expect(model.size().y()).toBe(200);
        expect(model.border().thickness()).toBe(1);
        expect(model.border().color()).toBe("red");
        expect(model.border().radius()).toBe("50%");
        expect(model.color()).toBe("blue");
    });

    it("It should be possible to quick set as a line", function () {
        model.setAsLine(100, 150, 200, 250, "red");
        expect(model.position().x()).toBe(100);
        expect(model.position().y()).toBe(150);
        expect(model.size().x()).toBeCloseTo(141.42);
        expect(model.size().y()).toBe(1);
        expect(model.border().thickness()).toBe(1);
        expect(model.border().color()).toBe(null);
        expect(model.border().radius()).toBe(0);
        expect(model.color()).toBe("red");
        expect(model.rotationOrigin().x()).toBe(0);
        expect(model.rotationOrigin().y()).toBe(0);
        expect(model.rotation()).toBeCloseTo(45);
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

    it("It should set the children's DOM parent after updating the parent DOM element", function () {
        var child = new DOMinus.Node();
        model.addChild(child);

        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        expect(child.domParent()).toBe(domElement);
    });

    it("It should set the children's DOM parent after adding to the parent", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);

        var child = new DOMinus.Node();
        model.addChild(child);
        expect(child.domParent()).toBe(domElement);
    });

    it("It should clear the children's DOM parent after removing from the parent", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);

        var child = new DOMinus.Node();
        model.addChild(child);
        model.removeChildAt(0);
        expect(child.domParent()).toBeNull();
    });

    it("It should clear the DOM element after updating the DOM parent", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);

        var child = new DOMinus.Node();
        model.addChild(child);

        var domParent = $("<div class='node'/>");
        model.domParent(domParent);
        expect(model.domElement()).toBeNull();
        expect(child.domParent()).toBeNull();
        expect(child.domElement()).toBeNull();
    });

    it("It should be able to render the size", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.size(10, 20);
        model.render(1);
        expect(domElement.css("width")).toBe("10px");
        expect(domElement.css("height")).toBe("20px");
    });

    it("It should be able to render the position", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.position(10, 20);
        model.render(1);
        expect(domElement.css("left")).toBe("10px");
        expect(domElement.css("top")).toBe("20px");
    });

    it("It should be able to render the scale", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.scale(10, 20);
        model.render(1);
        expect(domElement.css("transform")).toBe("scale(10, 20)");
    });

    it("It should be able to render the rotation", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.rotation(45);
        model.render(1);
        expect(domElement.css("transform")).toBe("rotate(45deg)");
    });

    it("It should be able to render the rotation origin", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.rotationOrigin(10, 20);
        model.render(1);
        expect(domElement.css("transform-origin")).toBe("10px 20px");
    });

    it("It should be able to render the color", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.color("red");
        model.render(1);
        expect(domElement.css("background-color")).toBe("red");
    });

    it("It should be able to render the opacity", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.opacity(0.5);
        model.render(1);
        expect(domElement.css("opacity")).toBe("0.5");
    });

    it("It should be able to render the border", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.border(3, "red", "50%");
        model.render(1);
        expect(domElement.css("border")).toBe("3px solid red");
        expect(domElement.css("border-top-left-radius")).toBe("50%");
        expect(domElement.css("border-top-right-radius")).toBe("50%");
        expect(domElement.css("border-bottom-left-radius")).toBe("50%");
        expect(domElement.css("border-bottom-right-radius")).toBe("50%");
    });

    it("It should be able to render the sprite", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.size(10, 20);
        model.sprite("image.png", 1, 2, 3);
        model.render(1);
        expect(domElement.css("background-image")).toContain("image.png");
        expect(domElement.css("background-position")).toBe("0px -20px");
    });

    it("It should be able to apply the increments after rendering", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.position(10, 20);
        model.positionInc(5, 5);
        model.scale(10, 20);
        model.scaleInc(5, 5);
        model.rotation(45);
        model.rotationInc(5);
        model.sprite("image.png", 1, 2, 3);
        model.render(3);
        expect(model.position().x()).toBe(15);
        expect(model.position().y()).toBe(25);
        expect(model.scale().x()).toBe(15);
        expect(model.scale().y()).toBe(25);
        expect(model.rotation()).toBe(50);
        expect(model.sprite().currentFrame()).toBe(1);
    });

    it("It should be able to set an animation", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.animate(2, "ease-in-out", null);
        expect(domElement.css("transition")).toBe("all 2s ease-in-out");
    });

    it("It should be able to set the spin", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        model.setSpin(true);
        expect(domElement.hasClass("spin")).toBeTruthy();
    });

    it("It should be able to detect and commit all the changes", function () {
        var domElement = $("<div class='node'/>");
        model.domElement(domElement);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.size(10, 20);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.position(10, 20);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.scale(10, 20);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.rotation(45);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.rotationOrigin(10, 20);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.color("red");
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.opacity(0.5);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.border(3, "red", "50%");
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();

        model.sprite("image.png", 1, 2, 3);
        expect(model.isChanged()).toBeTruthy();

        model.render(1);
        expect(model.isChanged()).toBeFalsy();
    });
});
