(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");

    // This is effectively a visual tester, so we just lay out our variables without much structure.
    let xwingX = 500;
    let xwingY = 500;
    let xwingScale = 3.0;
    let wingOpenAmount = 0.0;

    let triggered = false;

    let dstarX = 200;
    let dstarY = 200;
    let howReady = 0;

    let computerX = 800;
    let computerY = 150;
    let computerScale = 5.0;
    let aimAmount = 0.0;

    const FRAME_DURATION = 30; // In milliseconds.

    let lastTimestamp = 0;
    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }

        lastTimestamp = timestamp;

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);

        renderingContext.save();
        renderingContext.translate(xwingX, xwingY);
        renderingContext.scale(xwingScale, xwingScale);
        renderingContext.save();
        SampleSpriteLibrary.xwing({
            renderingContext,
            wingOpenAmount
        });
        renderingContext.restore();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(dstarX, dstarY);
        SampleSpriteLibrary.deathStar({
            renderingContext,
            howReady
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(computerX, computerY);
        renderingContext.scale(computerScale, computerScale);
        renderingContext.scale(.5, .5);
        SampleSpriteLibrary.targettingComputer({
            renderingContext,
            aimAmount
        });
        renderingContext.restore();

        aimAmount += .005;


        // dstarX += 1;
        // dstarY += 1;
        howReady += .01;

        xwingY -= 0.5;
        xwingScale *= .999;

        if (!triggered) {wingOpenAmount += .01;}

        if (wingOpenAmount > 1.0) {
            triggered = true;
        }

        if (triggered && wingOpenAmount > .75) {
            wingOpenAmount -= .01;
        }

        window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
