/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../JS/DOMinus.js" />

describe("Border Class", function () {
    var model;

    beforeEach(function () {
        model = new DOMinus.Border();
    });

    it("It should be possible to set the thickness", function () {
        model.thickness(3);
        expect(model.thickness()).toBe(3);
    });

    it("It should be possible to set the color", function () {
        model.color("red");
        expect(model.color()).toBe("red");
    });

    it("It should be possible to set the radius", function () {
        model.radius("50%");
        expect(model.radius()).toBe("50%");
    });

    it("It should be possible to set the border", function () {
        model.setBorder(3, "red");
        expect(model.thickness()).toBe(3);
        expect(model.color()).toBe("red");
    });

    it("It should be able to detect if the border has a value", function () {
        model.setBorder(3, "red");
        expect(model.hasBorderValue()).toBeTruthy();

        model.setBorder(null, "red");
        expect(model.hasBorderValue()).toBeFalsy();

        model.setBorder(3, null);
        expect(model.hasBorderValue()).toBeFalsy();
    });

    it("It should be able to detect if the radius has a value", function () {
        model.radius("50%");
        expect(model.hasRadiusValue()).toBeTruthy();

        model.radius(null);
        expect(model.hasRadiusValue()).toBeFalsy();
    });

    it("It should be able to detect and commit all the changes", function () {
        expect(model.isBorderChanged()).toBeTruthy();
        expect(model.isRadiusChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitBorder();
        expect(model.isBorderChanged()).toBeFalsy();
        expect(model.isRadiusChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitRadius();
        expect(model.isBorderChanged()).toBeFalsy();
        expect(model.isRadiusChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();

        model.thickness(3);
        expect(model.isBorderChanged()).toBeTruthy();
        expect(model.isRadiusChanged()).toBeFalsy();
        expect(model.isChanged()).toBeTruthy();

        model.commitBorder();
        model.commitRadius();
        expect(model.isBorderChanged()).toBeFalsy();
        expect(model.isRadiusChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();

        model.color("red");
        expect(model.isBorderChanged()).toBeTruthy();
        expect(model.isRadiusChanged()).toBeFalsy();
        expect(model.isChanged()).toBeTruthy();

        model.commitBorder();
        model.commitRadius();
        expect(model.isBorderChanged()).toBeFalsy();
        expect(model.isRadiusChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();

        model.radius("50%");
        expect(model.isBorderChanged()).toBeFalsy();
        expect(model.isRadiusChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitBorder();
        model.commitRadius();
        expect(model.isBorderChanged()).toBeFalsy();
        expect(model.isRadiusChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();
    });
});
