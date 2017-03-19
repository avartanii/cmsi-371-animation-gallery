(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SHOTS_IN_HEIGHT = 200;
    const SHOTS_IN_WIDTH = SHOTS_IN_HEIGHT;


    // Hold off on drawing
    let readyShotsIn = false;

    // Import and prime images for drawing
    var shotsIn = new Image();
    shotsIn.onload = () => {
        readyShotsIn = true;
    };
    shotsIn.src = "Images/shots/shots-in.svg";

    let drawShotsIn = (renderingContext) => {
        renderingContext.save();
        if (readyShotsIn) {
            renderingContext.drawImage(shotsIn, -SHOTS_IN_WIDTH / 2, -SHOTS_IN_HEIGHT / 2, SHOTS_IN_WIDTH, SHOTS_IN_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.shotsIn = (waitForIt) => {
        let renderingContext = waitForIt.renderingContext;

        renderingContext.save();
        drawShotsIn(renderingContext);
        renderingContext.restore();
    };
})();
