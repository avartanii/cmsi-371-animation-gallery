(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterRight = false;

    // Import and prime images for drawing
    var tieFighterRight = new Image();
    tieFighterRight.onload = () => {
        readyTieFighterRight = true;
    };
    tieFighterRight.src = "Images/tie-fighters/tie-fighter-right.svg";

    let drawTieFighterRight = (renderingContext) => {
        renderingContext.save();
        if (readyTieFighterRight) {
            renderingContext.drawImage(tieFighterRight,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFighterRight = (flightPlan) => {
        let renderingContext = flightPlan.renderingContext;

        renderingContext.save();
        drawTieFighterRight(renderingContext);
        renderingContext.restore();
    };
})();
