(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterRightExplode = false;

    // Import and prime images for drawing
    var tieFighterRightExplode = new Image();
    tieFighterRightExplode.onload = () => {
        readyTieFighterRightExplode = true;
    };
    tieFighterRightExplode.src = "Images/tie-fighters/tie-fighter-right-explode.svg";

    let drawTieFighterRightExplode = (renderingContext) => {
        renderingContext.save();
        if (readyTieFighterRightExplode) {
            renderingContext.drawImage(tieFighterRightExplode,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFighterRightExplode = (flightPlan) => {
        let renderingContext = flightPlan.renderingContext;

        renderingContext.save();
        drawTieFighterRightExplode(renderingContext);
        renderingContext.restore();
    };
})();
