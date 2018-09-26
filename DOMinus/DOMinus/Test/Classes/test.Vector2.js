/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../JS/DOMinus.js" />

describe("Vector2 Class", function () {
    var model;

    beforeEach(function () {
        model = new DOMinus.Vector2(2, 2);
    });

    it("It should be possible to set a new value", function () {
        model.x(3);
        expect(model.x()).toBe(3);
        expect(model.y()).toBe(2);

        model.y(5);
        expect(model.x()).toBe(3);
        expect(model.y()).toBe(5);

        model.setXY(2, 4);
        expect(model.x()).toBe(2);
        expect(model.y()).toBe(4);
    });

    it("It should be possible to sum a scalar value", function () {
        model.sumXY(2, 4);
        expect(model.x()).toBe(4);
        expect(model.y()).toBe(6);
    });

    it("It should be possible to sum another object", function () {
        model.sumVector(new DOMinus.Vector2(2, 4));
        expect(model.x()).toBe(4);
        expect(model.y()).toBe(6);
    });

    it("It should be possible to multiply a scalar value", function () {
        model.mulScalar(5);
        expect(model.x()).toBe(10);
        expect(model.y()).toBe(10);
    });

    it("It should be able to detect if it has a value", function () {
        expect(model.hasValue()).toBeTruthy();

        model.setXY(null, 2);
        expect(model.hasValue()).toBeFalsy();

        model.setXY(2, null);
        expect(model.hasValue()).toBeFalsy();
    });

    it("It should be able to detect and commit all the changes", function () {
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.x(3);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeFalsy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.y(5);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.setXY(2, 4);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.setXY(2, null);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.setXY(null, 2);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.setXY(null, null);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.sumXY(2, 4);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.sumVector(new DOMinus.Vector2(2, 4));
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.mulScalar(5);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();
    });

    it("It should be able to partially commit the changes", function () {
        model.setXY(2, 4);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commitX();
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeTruthy();

        model.commitY();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();

        model.setXY(2, 4);
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeTruthy();

        model.commitY();
        expect(model.isChanged()).toBeTruthy();
        expect(model.isXChanged()).toBeTruthy();
        expect(model.isYChanged()).toBeFalsy();

        model.commitX();
        expect(model.isChanged()).toBeFalsy();
        expect(model.isXChanged()).toBeFalsy();
        expect(model.isYChanged()).toBeFalsy();
    });
});
