(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterVader = false;

    // Import and prime images for drawing
    var tieFighterVader = new Image();
    tieFighterVader.onload = () => {
        readyTieFighterVader = true;
    };
    tieFighterVader.src = "Images/tie-fighters/tie-fighter-vader.svg";

    let drawTieFighterVader = (renderingContext) => {
        renderingContext.save();
        if (readyTieFighterVader) {
            renderingContext.drawImage(tieFighterVader,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFighterVader = (commander) => {
        let renderingContext = commander.renderingContext;

        renderingContext.save();
        drawTieFighterVader(renderingContext);
        renderingContext.restore();
    };
})();
