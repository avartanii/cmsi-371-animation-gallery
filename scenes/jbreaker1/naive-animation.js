(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");
    // This is effectively a visual tester, so we just lay out our variables without much structure.
    let x = 300;
    let y = 300;
    let amount = 0;
    let rotateLeft = 0;
    let rotateRight = 0;
    // let background = new Image();
    // background.src = "KitchenPic.jpg";
    let down = 10;
    let change = 1;
    renderingContext.save();

    /*    background.onload = function() {
              renderingContext.drawImage(background, 0, 0);
        }*/

    renderingContext.restore();
    const FRAME_DURATION = 100; // In milliseconds.
    let lastTimestamp = 0;
    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }
        lastTimestamp = timestamp;
        renderingContext.clearRect(0, 0, canvas.width, canvas.height);
        // renderingContext.drawImage(background,0,0);
        renderingContext.save();
        SampleSpriteLibrary.deepFryer({
            renderingContext,
            down,
            change
        });
        if (lastTimestamp < 3000) {
            down = down + 1;
        } else {
            change = 1;
            down = down - 1;
        }
        SampleSpriteLibrary.potato({
            renderingContext,
            x,
            y,
            amount
        });
        amount = amount + 1;
        if (amount > 2) {
            amount = 0;
        }
        renderingContext.restore();
        renderingContext.save();
        SampleSpriteLibrary.person({
            renderingContext,
            rotateRight,
            rotateLeft
        });
        renderingContext.restore();
        if (rotateLeft > 20) {
            rotateLeft = 0;
        }
        rotateRight = rotateRight + 1;
        rotateLeft = rotateLeft + 1;
        if (rotateRight > 20) {
            rotateRight = 0;
        }
        window.requestAnimationFrame(drawFrame);
    };
    window.requestAnimationFrame(drawFrame);
})();
