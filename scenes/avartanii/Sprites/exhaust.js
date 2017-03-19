(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const EXHAUST_HEIGHT = 768;
    const EXHAUST_WIDTH = 1024;


    // Hold off on drawing
    let readyExhaust = false;

    // Import and prime images for drawing
    var exhaust = new Image();
    exhaust.onload = () => {
        readyExhaust = true;
    };
    exhaust.src = "Images/backgrounds/exhaust.svg";

    let drawExhaust = (renderingContext) => {
        renderingContext.save();
        if (readyExhaust) {
            renderingContext.drawImage(exhaust, -EXHAUST_WIDTH / 2, -EXHAUST_HEIGHT / 2, EXHAUST_WIDTH, EXHAUST_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.exhaust = (uhOh) => {
        let renderingContext = uhOh.renderingContext;

        renderingContext.save();
        drawExhaust(renderingContext);
        renderingContext.restore();
    };
})();
