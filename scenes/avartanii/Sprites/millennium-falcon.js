(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FALCON_HEIGHT = 200;
    const FALCON_WIDTH = FALCON_HEIGHT;


    // Hold off on drawing
    let readyFalcon = false;

    // Import and prime images for drawing
    var falcon = new Image();
    falcon.onload = () => {
        readyFalcon = true;
    };
    falcon.src = "Images/falcon/millennium-falcon.svg";

    let drawFalcon = (renderingContext) => {
        renderingContext.save();
        if (readyFalcon) {
            renderingContext.drawImage(falcon, -FALCON_WIDTH / 2, -FALCON_HEIGHT / 2, FALCON_WIDTH, FALCON_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.falcon = (smuggler) => {
        let renderingContext = smuggler.renderingContext;

        renderingContext.save();
        drawFalcon(renderingContext);
        renderingContext.restore();
    };
})();
