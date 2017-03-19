(() => {
    let imgCarl = new Image();
    imgCarl.src = "carl.png";
    let imgRussellStanding = new Image();
    imgRussellStanding.src = "russell-standing.png";
    let imgRussellJumping = new Image();
    imgRussellJumping.src = "russell-jumping.png";
    let imgRussellLeaping = new Image();
    imgRussellLeaping.src = "russell-leaping.png";

    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");
    const FRAME_DURATION = 30; // In milliseconds.
    let lastTimestamp = 0;

    // House Variables
    let houseX = 200;
    let houseY = 550;
    let houseRadius = 200;
    let houseScale = 1.0;
    let windowPercentOpen = 0;

    const UNIT = houseRadius / 12;

    // Cloud Variables
    let cloudPositionsX = [80, 620, 417];
    let cloudPositionsY = [160, 280, 124];
    let skyColor = "#CBEBF6";

    // Balloon Variables
    let balloonColors = [128210215, 128210215, 128210215, 128210215, 128210215, 128210215, 128210215];
    let stringAngles = [-10, -5, 0, 5, 10, 15, -15];
    let stringLengths = [100, 200, 50, 78, 150, 130, 45];
    let tetherX = houseX - UNIT;
    let tetherY = houseY - (UNIT * 6);

    // Russell
    let russellState = 0;
    let russellX = 30;

    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }
        lastTimestamp = timestamp;

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);

        // SKY
        renderingContext.save();
        renderingContext.rect(0, 0, canvas.width, canvas.height);
        renderingContext.fillStyle = skyColor;
        renderingContext.fill();
        renderingContext.restore();

        // CLOUDS: Static Sprite
        for (let i = 0; i < cloudPositionsX.length; i++) {
            renderingContext.save();
            renderingContext.translate(cloudPositionsX[i], cloudPositionsY[i]);
            SampleSpriteLibrary.cloud({
                renderingContext
            });
            renderingContext.restore();
        }

        // BALLOONS (SPRITE #1)
        for (let i = 0; i < balloonColors.length; i++) {
            renderingContext.save();
            renderingContext.translate(tetherX, tetherY);
            SampleSpriteLibrary.balloon({
                renderingContext: renderingContext,
                color: balloonColors[i],
                angle: stringAngles[i],
                stringLength: stringLengths[i]
            });
            renderingContext.restore();
        }

        // HOUSE (SPRITE #2)
        renderingContext.save();
        renderingContext.translate(houseX, houseY);
        renderingContext.scale(houseScale, houseScale);
        SampleSpriteLibrary.house({
            renderingContext,
            houseRadius,
            windowPercentOpen,
            imgCarl
        });
        windowPercentOpen = windowPercentOpen < 1 ? windowPercentOpen += .005 : 1;
        renderingContext.restore();

        // RUSSELL (SPRITE #3)
        renderingContext.save();
        renderingContext.translate(russellX, 600);
        SampleSpriteLibrary.russell({
            renderingContext,
            imgRussellStanding,
            imgRussellJumping,
            imgRussellLeaping,
            russellState
        });
        renderingContext.restore();

        // SPEECH BUBBLE
        renderingContext.save();
        renderingContext.translate(100, 100);
        SampleSpriteLibrary.speechBubble({
            renderingContext
        });
        renderingContext.restore();

        // Animation Calculations
        stringLengths = stringLengths.map((x) => {
            let sum = x > 300 ? x : x += 1;
            return sum;
        });
        houseX += .5;
        tetherX = houseX - UNIT;
        tetherY = houseY - (UNIT * 6);
        russellX += 2;
        russellState += .1;

        window.requestAnimationFrame(drawFrame);
    };

    $(imgCarl, imgRussellStanding, imgRussellJumping, imgRussellLeaping).load(() => {
        window.requestAnimationFrame(drawFrame);
    });

})();
