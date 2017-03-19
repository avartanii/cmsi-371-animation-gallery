(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFightersBack = false;

    // Import and prime images for drawing
    var tieFightersBack = new Image();
    tieFightersBack.onload = () => {
        readyTieFightersBack = true;
    };
    tieFightersBack.src = "Images/tie-fighters/tie-fighters-back.svg";

    let drawTieFightersBack = (renderingContext) => {
        renderingContext.save();
        if (readyTieFightersBack) {
            renderingContext.drawImage(tieFightersBack,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFightersBack = (badAss) => {
        let renderingContext = badAss.renderingContext;

        renderingContext.save();
        drawTieFightersBack(renderingContext);
        renderingContext.restore();
    };
})();
