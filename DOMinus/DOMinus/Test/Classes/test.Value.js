/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../JS/DOMinus.js" />

describe("Value Class", function () {
    var model;

    beforeEach(function () {
        model = new DOMinus.Value(1);
    });

    it("It should be possible to set a new value", function () {
        model.value(3);
        expect(model.value()).toBe(3);
    });

    it("It should be possible to sum a scalar value", function () {
        model.sumValue(4);
        expect(model.value()).toBe(5);
    });

    it("It should be possible to sum another object", function () {
        model.sumValueObj(new DOMinus.Value(4));
        expect(model.value()).toBe(5);
    });

    it("It should be able to detect if it has a value", function () {
        expect(model.hasValue()).toBeTruthy();

        model.value(null);
        expect(model.hasValue()).toBeFalsy();
    });

    it("It should be able to detect and commit all the changes", function () {
        expect(model.isChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();

        model.value(3);
        expect(model.isChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();

        model.value(null);
        expect(model.isChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();

        model.sumValue(4);
        expect(model.isChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();

        model.sumValueObj(new DOMinus.Value(4));
        expect(model.isChanged()).toBeTruthy();

        model.commit();
        expect(model.isChanged()).toBeFalsy();
    });
});
