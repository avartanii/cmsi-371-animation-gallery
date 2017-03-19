(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const TC_HEIGHT = 200;
    const TC_WIDTH = TC_HEIGHT;
    const CROSSHAIR_MAX = .105 * TC_HEIGHT;
    const COUNTDOWN_MAX = 36000;
    const TRENCH_ZOOM_MAX = .25;

    let trenchZoom = 0.0;

    // Hold off on drawing
    let readyBody = false;
    let readyMonitor = false;
    let readyTrench = false;
    let readyCrosshairsLeft = false;
    let readyCrosshairsRight = false;


    // Import and prime images for drawing
    var targettingComputerBody = new Image();
    targettingComputerBody.onload = () => {
        readyBody = true;
    };
    targettingComputerBody.src = "Images/targetting-computer/targetting-computer-body.svg";

    var targettingComputerMonitor = new Image();
    targettingComputerMonitor.onload = () => {
        readyMonitor = true;
    };
    targettingComputerMonitor.src = "Images/targetting-computer/targetting-computer-monitor.svg";

    var targettingComputerTrench = new Image();
    targettingComputerTrench.onload = () => {
        readyTrench = true;
    };
    targettingComputerTrench.src = "Images/targetting-computer/targetting-computer-trench.svg";

    var targettingComputerCrosshairsLeft = new Image();
    targettingComputerCrosshairsLeft.onload = () => {
        readyCrosshairsLeft = true;
    };
    targettingComputerCrosshairsLeft.src = "Images/targetting-computer/targetting-computer-crosshairs-left.svg";

    var targettingComputerCrosshairsRight = new Image();
    targettingComputerCrosshairsRight.onload = () => {
        readyCrosshairsRight = true;
    };
    targettingComputerCrosshairsRight.src = "Images/targetting-computer/targetting-computer-crosshairs-right.svg";

    let drawBody = (renderingContext) => {
        renderingContext.save();
        if (readyBody) {
            renderingContext.drawImage(targettingComputerBody, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawTrench = (renderingContext) => {
        renderingContext.save();
        if (readyTrench && readyMonitor) {
            renderingContext.translate(.03 * TC_HEIGHT, -.016 * TC_HEIGHT);
            if (trenchZoom >= TRENCH_ZOOM_MAX) {
                trenchZoom = 0.0;
            }
            renderingContext.save();
            renderingContext.scale(trenchZoom, trenchZoom);
            renderingContext.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            renderingContext.restore();
            renderingContext.save();
            renderingContext.scale(.25 + trenchZoom, .25 + trenchZoom);
            renderingContext.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            renderingContext.restore();
            renderingContext.save();
            renderingContext.scale(.5 + trenchZoom, .5 + trenchZoom);
            renderingContext.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            renderingContext.restore();
            renderingContext.save();
            renderingContext.scale(.75 + trenchZoom, .75 + trenchZoom);
            renderingContext.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            renderingContext.restore();
            trenchZoom += .025;
        }
        renderingContext.restore();
        renderingContext.drawImage(targettingComputerMonitor, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
    };

    let drawCrosshairs = (renderingContext, aimAmount) => {
        let translateAmount = aimAmount * CROSSHAIR_MAX;
        if (readyCrosshairsLeft && readyCrosshairsRight) {
            renderingContext.save();
            renderingContext.translate(.03 * TC_HEIGHT, -.016 * TC_HEIGHT);
            if (translateAmount >= CROSSHAIR_MAX) {
                translateAmount = CROSSHAIR_MAX;
            }
            renderingContext.save();
            renderingContext.translate(translateAmount, 0);
            renderingContext.drawImage(targettingComputerCrosshairsLeft, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            renderingContext.restore();
            renderingContext.save();
            renderingContext.translate(-translateAmount, 0);
            renderingContext.drawImage(targettingComputerCrosshairsRight, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            renderingContext.restore();
            renderingContext.restore();
            renderingContext.drawImage(targettingComputerMonitor, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
        }
    };

    let drawNumbers = (renderingContext, aimAmount) => {
        if (readyMonitor) {
            let numbers = aimAmount <= 1.0 ? parseInt((1 - aimAmount) * COUNTDOWN_MAX) : 0.0;
            let numberOfZeros = aimAmount < 1.0 ? 5 - parseInt(Math.ceil(Math.log10(numbers))) : 4;
            let zeros = "0";
            for (var i = 0; i < numberOfZeros; i++) {
                zeros += "0";
            }
            renderingContext.save();
            renderingContext.translate(.030 * TC_HEIGHT, .120 * TC_HEIGHT);
            renderingContext.scale(TC_HEIGHT / 250, TC_HEIGHT / 250);
            renderingContext.fillStyle = "red";
            renderingContext.textAlign = "center";
            renderingContext.font = '10px AG-Stencil';
            renderingContext.fillText(zeros + "" + numbers, 0, 0);
            renderingContext.restore();
        }
    };

    let drawComputer = (renderingContext, aimAmount) => {
        renderingContext.save();
        drawBody(renderingContext);
        drawTrench(renderingContext);
        drawCrosshairs(renderingContext, aimAmount);
        drawNumbers(renderingContext, aimAmount);
        renderingContext.restore();
    };

    SampleSpriteLibrary.targettingComputer = (readyToFire) => {
        let renderingContext = readyToFire.renderingContext;
        let aimAmount = readyToFire.aimAmount;

        renderingContext.save();
        drawComputer(renderingContext, aimAmount);
        renderingContext.restore();
    };
})();
