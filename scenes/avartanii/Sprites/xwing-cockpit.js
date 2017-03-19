(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const XW_COCKPIT_HEIGHT = 200;
    const XW_COCKPIT_WIDTH = XW_COCKPIT_HEIGHT;

    // Hold off on drawing
    let readyCockpit = false;

    // Import and prime images for drawing
    var xwingCockpitImage = new Image();
    xwingCockpitImage.onload = () => {
        readyCockpit = true;
    };
    xwingCockpitImage.src = "Images/x-wing/x-wing-drawing-cockpit.svg";

    let drawCockpit = (renderingContext) => {
        renderingContext.save();
        if (readyCockpit) {
            renderingContext.drawImage(xwingCockpitImage,
                -XW_COCKPIT_WIDTH / 2, -XW_COCKPIT_HEIGHT / 2, XW_COCKPIT_WIDTH, XW_COCKPIT_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.xwingCockpit = (rebel) => {
        let renderingContext = rebel.renderingContext;

        renderingContext.save();
        drawCockpit(renderingContext);
        renderingContext.restore();
    };
})();
