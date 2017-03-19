(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");
    let toalX = 425;
    let toalY = -canvas.height;
    let toalArmStage = 0;
    let dondiX = canvas.width;
    let dondiY = 200;
    let dondiThrowStage = 0;
    let sashaX = 0;
    let sashaY = 0;
    let sashaPoseStage = 0;
    let bgReady = false;

    let bgImage = new Image();
    bgImage.addEventListener('load', () => {
        bgReady = true;
    });
    bgImage.src = "bg.png";

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
        renderingContext.scale(0.67, 0.67);
        if (bgReady) {
            renderingContext.drawImage(bgImage, 0, 0);
        }
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(toalX, toalY);
        SampleSpriteLibrary.toalSprite({
            renderingContext: renderingContext,
            armStage: toalArmStage
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(dondiX, dondiY);
        SampleSpriteLibrary.dondiSprite({
            renderingContext: renderingContext,
            throwStage: dondiThrowStage
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(sashaX, sashaY);
        SampleSpriteLibrary.sashaSprite({
            renderingContext: renderingContext,
            poseStage: sashaPoseStage
        });
        renderingContext.restore();

        toalArmStage += 0.2;
        if (toalY <= -17) {
            toalY += 50;
        }

        dondiThrowStage += 0.3;
        if (dondiX >= 0) {
            dondiX -= 25;
        }

        sashaPoseStage += 0.1;

        window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
