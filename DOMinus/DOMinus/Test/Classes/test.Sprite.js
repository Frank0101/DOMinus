/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../JS/DOMinus.js" />

describe("Sprite Class", function () {
    var model;

    beforeEach(function () {
        model = new DOMinus.Sprite("image.png");
    });

    it("It should be possible to set the image", function () {
        model.image("new-image.png");
        expect(model.image()).toBe("new-image.png");
    });

    it("It should be possible to set the animation row", function () {
        model.animationRow(5);
        expect(model.animationRow()).toBe(5);
    });

    it("It should be possible to set the animation length", function () {
        model.animationLength(5);
        expect(model.animationLength()).toBe(5);
    });

    it("It should be possible to set the animation delay", function () {
        model.animationDelay(5);
        expect(model.animationDelay()).toBe(5);
    });

    it("It should be possible to set the current frame", function () {
        model.currentFrame(5);
        expect(model.currentFrame()).toBe(5);
    });

    it("It should be possible to set the current frame", function () {
        model.currentFrame(5);
        expect(model.currentFrame()).toBe(5);
    });

    it("It should be possible to set the animation", function () {
        model.setAnimation(5, 10, 15);
        expect(model.animationRow()).toBe(5);
        expect(model.animationLength()).toBe(10);
        expect(model.animationDelay()).toBe(15);
    });

    it("It should be possible to move forward the animation", function () {
        model.setAnimation(5, 10, 15);
        expect(model.currentFrame()).toBe(0);

        model.moveForward();
        expect(model.currentFrame()).toBe(1);

        model.moveForward();
        model.moveForward();
        model.moveForward();
        model.moveForward();
        model.moveForward();
        model.moveForward();
        model.moveForward();
        model.moveForward();
        expect(model.currentFrame()).toBe(9);

        model.moveForward();
        expect(model.currentFrame()).toBe(0);
    });

    it("It should be able to detect if the image has a value", function () {
        expect(model.hasImageValue()).toBeTruthy();

        model.image(null);
        expect(model.hasImageValue()).toBeFalsy();
    });

    it("It should be able to detect if the animation has a value", function () {
        model.setAnimation(5, 10, 15);
        expect(model.hasAnimationValue()).toBeTruthy();

        model.setAnimation(null, 10, 15);
        expect(model.hasAnimationValue()).toBeFalsy();

        model.setAnimation(5, null, 15);
        expect(model.hasAnimationValue()).toBeFalsy();

        model.setAnimation(5, 10, null);
        expect(model.hasAnimationValue()).toBeFalsy();
    });

    it("It should be able to detect and commit all the changes", function () {
        expect(model.isImageChanged()).toBeTruthy();
        expect(model.isAnimationChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitImage();
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitAnimation();
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();

        model.image("new-image.png");
        expect(model.isImageChanged()).toBeTruthy();
        expect(model.isAnimationChanged()).toBeFalsy();
        expect(model.isChanged()).toBeTruthy();

        model.commitImage();
        model.commitAnimation();
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();

        model.animationRow(5);
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitImage();
        model.commitAnimation();
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();

        model.currentFrame(5);
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeTruthy();
        expect(model.isChanged()).toBeTruthy();

        model.commitImage();
        model.commitAnimation();
        expect(model.isImageChanged()).toBeFalsy();
        expect(model.isAnimationChanged()).toBeFalsy();
        expect(model.isChanged()).toBeFalsy();
    });
});
