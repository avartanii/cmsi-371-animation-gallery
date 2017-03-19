(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    // initialize images
    let body = new Image(),
        armL = new Image(),
        armR = new Image(),
        bodyLoaded = false,
        armLLoaded = false,
        armRLoaded = false;

    const
        BODY_WIDTH = 120,
        BODY_HEIGHT = 160,
        ARM_WIDTH = 50,
        ARM_HEIGHT = 50,
        LEFT_ARM_X = -BODY_WIDTH / 2.4,
        RIGHT_ARM_X = 0,
        ARM_Y = -BODY_HEIGHT / 30,
        MAX_ARM_DEGREE_MAG = 70,
        MAX_L_X_OFFSET = 7,
        MAX_L_Y_OFFSET = 25,
        CLIPPING_WIDTH = 120,
        CLIPPING_HEIGHT = 160;

    // make sure nothing happens until images are loaded
    body.onload = () => {
        bodyLoaded = true;
    };

    armL.onload = () => {
        armLLoaded = true;
    };

    armR.onload = () => {
        armRLoaded = true;
    };

    // load images
    body.src = '../images/cartoon-astronaut-no-arms.png';
    armL.src = '../images/cartoon-astronaut-left-arm.png';
    armR.src = '../images/cartoon-astronaut-right-arm.png';

    let drawBody = (renderingContext) => {
        renderingContext.save();
        if (bodyLoaded) {
            renderingContext.drawImage(body, -BODY_WIDTH / 2, -BODY_HEIGHT / 2, BODY_WIDTH, BODY_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawArm = (renderingContext, isLeft, rotationDegrees) => { // rotations go from 0 (arm down) to 1 (extended mostly up)
        let arm = isLeft ? armL : armR,
            xOffset,
            yOffset,
            decimalRotated;

        // Constrain behavior at maximum
        if (isLeft && rotationDegrees >= MAX_ARM_DEGREE_MAG) {
            rotationDegrees = MAX_ARM_DEGREE_MAG;
        } else if (!isLeft && rotationDegrees <= -MAX_ARM_DEGREE_MAG){
            rotationDegrees = -MAX_ARM_DEGREE_MAG;
        }


        if (isLeft && armLLoaded || !isLeft && armRLoaded) {
            renderingContext.save();
            if (isLeft) {
                // need to offset rotation
                decimalRotated = rotationDegrees / MAX_ARM_DEGREE_MAG;
                xOffset = MAX_L_X_OFFSET * decimalRotated;
                yOffset = MAX_L_Y_OFFSET * decimalRotated;

                renderingContext.translate(LEFT_ARM_X + ARM_WIDTH - xOffset, ARM_Y + yOffset); // rotate from top right corner
                renderingContext.rotate(rotationDegrees * Math.PI / 180);
                renderingContext.drawImage(arm, LEFT_ARM_X, ARM_Y, ARM_WIDTH, ARM_HEIGHT);
            } else {
                // need to offset rotation
                decimalRotated = -rotationDegrees / MAX_ARM_DEGREE_MAG;
                yOffset = MAX_L_Y_OFFSET * decimalRotated;

                renderingContext.translate(RIGHT_ARM_X, ARM_Y + yOffset); // rotate from top left corner
                renderingContext.rotate(rotationDegrees * Math.PI / 180);
                renderingContext.drawImage(arm, RIGHT_ARM_X, ARM_Y, ARM_WIDTH, ARM_HEIGHT);
            }
            renderingContext.restore();
        }
    };

    let drawClip = (renderingContext, decimalVisible) => {
        // don't save/restore renderingContext to maintain clip

        // define top corner of clipping rectangle
        let clipOffset = decimalVisible * CLIPPING_HEIGHT;
        let topY = CLIPPING_HEIGHT / 2 - clipOffset;

        renderingContext.rect(-CLIPPING_WIDTH / 2, topY, CLIPPING_WIDTH, CLIPPING_HEIGHT);
        renderingContext.clip();
    };

    // Expose default parameter values
    SampleSpriteLibrary.defaults = SampleSpriteLibrary.defaults || {};

    SampleSpriteLibrary.defaults["astronaut"] = {
        armLRotation: 0.0,
        armRRotation: 0.0,
        decimalVisible: 1.0
    };

    SampleSpriteLibrary.astronaut = (astronautSpec) => {
        let renderingContext = astronautSpec.renderingContext,
            armLRotation = astronautSpec.armLRotation || 0.0,
            armRRotation = astronautSpec.armRRotation || 0.0,
            decimalVisible = typeof astronautSpec.decimalVisible !== "undefined" ? astronautSpec.decimalVisible : 1.0;
        renderingContext.save();
        drawClip(renderingContext, decimalVisible);
        drawBody(renderingContext);
        drawArm(renderingContext, true, armLRotation);
        drawArm(renderingContext, false, armRRotation);
        renderingContext.restore();
    };
})();
