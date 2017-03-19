(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const XW_HEIGHT = 200;
    const XW_WIDTH = XW_HEIGHT;
    const WING_OPEN = 1.0;
    const WING_CLOSED = 0.0;
    const WING_ANGLE = 15.0;

    let howOpen = WING_OPEN;


    // Hold off on drawing
    let readyLeftLower = false;
    let readyLeftUpper = false;
    let readyRightLower = false;
    let readyRightUpper = false;
    let readyBody = false;


    // Import and prime images for drawing
    var xwingLeftLowerImage = new Image();
    xwingLeftLowerImage.onload = () => {
        readyLeftLower = true;
    };
    xwingLeftLowerImage.src = "Images/x-wing/x-wing-drawing-left-lower.svg";

    var xwingLeftUpperImage = new Image();
    xwingLeftUpperImage.onload = () => {
        readyLeftUpper = true;
    };
    xwingLeftUpperImage.src = "Images/x-wing/x-wing-drawing-left-upper.svg";

    var xwingRightLowerImage = new Image();
    xwingRightLowerImage.onload = () => {
        readyRightLower = true;
    };
    xwingRightLowerImage.src = "Images/x-wing/x-wing-drawing-right-lower.svg";

    var xwingRightUpperImage = new Image();
    xwingRightUpperImage.onload = () => {
        readyRightUpper = true;
    };
    xwingRightUpperImage.src = "Images/x-wing/x-wing-drawing-right-upper.svg";

    var xwingBodyImage = new Image();
    xwingBodyImage.onload = () => {
        readyBody = true;

    };
    xwingBodyImage.src = "Images/x-wing/x-wing-drawing-body.svg";


    let drawLeftLower = (renderingContext) => {
        renderingContext.save();
        if (readyLeftLower) {
            renderingContext.drawImage(xwingLeftLowerImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawLeftUpper = (renderingContext) => {
        renderingContext.save();
        if (readyLeftUpper) {
            renderingContext.drawImage(xwingLeftUpperImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawRightLower = (renderingContext) => {
        renderingContext.save();
        if (readyRightLower) {
            renderingContext.drawImage(xwingRightLowerImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawRightUpper = (renderingContext) => {
        renderingContext.save();
        if (readyRightUpper) {
            renderingContext.drawImage(xwingRightUpperImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawBody = (renderingContext) => {
        renderingContext.save();
        if (readyBody) {
            renderingContext.drawImage(xwingBodyImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        renderingContext.restore();
    };

    let rotateLeftLower = (renderingContext, openAmount) => {
        renderingContext.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            renderingContext.rotate(((1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            renderingContext.rotate(((1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawLeftLower(renderingContext);
        renderingContext.restore();
    };

    let rotateLeftUpper = (renderingContext, openAmount) => {
        renderingContext.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            renderingContext.rotate((-(1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            renderingContext.rotate((-(1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawLeftUpper(renderingContext);
        renderingContext.restore();
    };

    let rotateRightLower = (renderingContext, openAmount) => {
        renderingContext.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            renderingContext.rotate((-(1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            renderingContext.rotate((-(1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawRightLower(renderingContext);
        renderingContext.restore();
    };

    let rotateRightUpper = (renderingContext, openAmount) => {
        renderingContext.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            renderingContext.rotate(((1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            renderingContext.rotate(((1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawRightUpper(renderingContext);
        renderingContext.restore();
    };

    let foldWings = (renderingContext, openAmount) => {
        renderingContext.save();
        rotateLeftLower(renderingContext, openAmount);
        rotateLeftUpper(renderingContext, openAmount);
        rotateRightLower(renderingContext, openAmount);
        rotateRightUpper(renderingContext, openAmount);
        drawBody(renderingContext);
        renderingContext.restore();
    };

    SampleSpriteLibrary.xwing = (flightPlan) => {
        let renderingContext = flightPlan.renderingContext;
        let wingOpenAmount = flightPlan.wingOpenAmount;

        renderingContext.save();
        // drawXWing(renderingContext);
        foldWings(renderingContext, wingOpenAmount);
        renderingContext.restore();
    };
})();
