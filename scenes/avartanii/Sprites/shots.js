(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SHOTS_HEIGHT = 200;
    const SHOTS_WIDTH = SHOTS_HEIGHT;


    // Hold off on drawing
    let readyShots = false;

    // Import and prime images for drawing
    var shots = new Image();
    shots.onload = () => {
        readyShots = true;
    };
    shots.src = "Images/shots/shots.svg";

    let drawShots = (renderingContext) => {
        renderingContext.save();
        if (readyShots) {
            renderingContext.drawImage(shots, -SHOTS_WIDTH / 2, -SHOTS_HEIGHT / 2, SHOTS_WIDTH, SHOTS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.shots = (pewPew) => {
        let renderingContext = pewPew.renderingContext;

        renderingContext.save();
        drawShots(renderingContext);
        renderingContext.restore();
    };
})();
