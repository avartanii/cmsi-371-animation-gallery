(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const BOOM_HEIGHT = 200;
    const BOOM_WIDTH = BOOM_HEIGHT;


    // Hold off on drawing
    let readyBoom = false;

    // Import and prime images for drawing
    var boom = new Image();
    boom.onload = () => {
        readyBoom = true;
    };
    boom.src = "Images/boom/boom.svg";

    let drawBoom = (renderingContext) => {
        renderingContext.save();
        if (readyBoom) {
            renderingContext.drawImage(boom, -BOOM_WIDTH / 2, -BOOM_HEIGHT / 2, BOOM_WIDTH, BOOM_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.boom = (kaBoom) => {
        let renderingContext = kaBoom.renderingContext;

        renderingContext.save();
        drawBoom(renderingContext);
        renderingContext.restore();
    };
})();
