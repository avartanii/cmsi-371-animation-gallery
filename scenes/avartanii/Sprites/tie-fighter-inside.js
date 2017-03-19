(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const INSIDE_HEIGHT = 768;
    const INSIDE_WIDTH = 1024;


    // Hold off on drawing
    let readyTieFighterInside = false;

    // Import and prime images for drawing
    var tieFighterInside = new Image();
    tieFighterInside.onload = () => {
        readyTieFighterInside = true;
    };
    tieFighterInside.src = "Images/tie-fighters/tie-fighter-inside.svg";

    let drawTieFightersInside = (renderingContext) => {
        renderingContext.save();
        if (readyTieFighterInside) {
            renderingContext.drawImage(tieFighterInside, -INSIDE_WIDTH / 2, -INSIDE_HEIGHT / 2, INSIDE_WIDTH, INSIDE_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFighterInside = (pilot) => {
        let renderingContext = pilot.renderingContext;

        renderingContext.save();
        drawTieFightersInside(renderingContext);
        renderingContext.restore();
    };
})();
