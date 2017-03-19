(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const
        TOTAL_HEIGHT = 300,
        BODY_HEIGHT = 400,
        FEET_HEIGHT = 30,
        BODY_WIDTH = 70,
        HELMET_RADIUS = 100,
        ARM_TOP_Y = 100,
        ARM_BOTTOM_Y = 120,
        ARM_RETRACTED = 40,
        ARM_EXTENDED = 100,
        ARM_HEIGHT = 20,
        EYE_RADIUS = 20,
        PUPIL_WIDTH = 7;

    // pupilPosDecimal may take any value from -1 to 1
    let drawBody = (renderingContext, pupilPosDecimal) => {
        pupilPosDecimal = pupilPosDecimal || 0.0;

        renderingContext.save();
        renderingContext.strokeStyle = 'black';
        renderingContext.fillStyle = '#30e593';
        renderingContext.lineWidth = 3;

        // draw top of body
        renderingContext.beginPath();
        renderingContext.moveTo(-BODY_WIDTH / 2, BODY_HEIGHT / 2 - FEET_HEIGHT);
        renderingContext.bezierCurveTo(
            -BODY_WIDTH / 2, -BODY_HEIGHT / 2,
            BODY_WIDTH / 2, -BODY_HEIGHT / 2,
            BODY_WIDTH / 2, BODY_HEIGHT / 2 - FEET_HEIGHT
        );
        renderingContext.stroke();
        renderingContext.closePath();
        renderingContext.fill();

        // draw bottom of body
        renderingContext.beginPath();
        renderingContext.moveTo(-BODY_WIDTH / 2, BODY_HEIGHT / 2 - FEET_HEIGHT);
        renderingContext.bezierCurveTo(
                -BODY_WIDTH / 2, BODY_HEIGHT / 2,
                -BODY_WIDTH / 2 + 10, BODY_HEIGHT / 2,
                0, BODY_HEIGHT / 2

        );
        renderingContext.bezierCurveTo(
            BODY_WIDTH / 2 - 10, BODY_HEIGHT / 2,
            BODY_WIDTH / 2, BODY_HEIGHT / 2,
            BODY_WIDTH / 2, BODY_HEIGHT / 2 - FEET_HEIGHT
        );
        renderingContext.stroke();
        renderingContext.closePath();
        renderingContext.fill();

        // draw eye
        renderingContext.fillStyle = 'white';
        renderingContext.beginPath();
        renderingContext.ellipse(
            0, -BODY_HEIGHT / 10,
            EYE_RADIUS, EYE_RADIUS,
            0,
            0, 2 * Math.PI
        );
        renderingContext.stroke();
        renderingContext.fill();

        // draw pupil
        let pupilX = pupilPosDecimal * (EYE_RADIUS - 5);

        renderingContext.fillStyle = 'black';
        renderingContext.beginPath();
        renderingContext.rect(
            -PUPIL_WIDTH / 2 + pupilX, -BODY_HEIGHT / 10 - PUPIL_WIDTH / 2,
            PUPIL_WIDTH, PUPIL_WIDTH
        );
        renderingContext.fill();
        renderingContext.restore();
    };

    let drawHelmet = (renderingContext) => {
        renderingContext.save();

        // draw glass part of helmet
        renderingContext.strokeStyle = 'black';
        renderingContext.lineWidth = 3;
        renderingContext.beginPath();
        renderingContext.ellipse(
            0, -TOTAL_HEIGHT / 2 + HELMET_RADIUS,
            HELMET_RADIUS, HELMET_RADIUS,
            0,
            0, 2 * Math.PI
        );
        renderingContext.stroke();

        // draw bottom of helmet
        renderingContext.strokeStyle = '#a7c3ef';
        renderingContext.lineWidth = 5;
        renderingContext.beginPath();
        renderingContext.ellipse(
            0, -TOTAL_HEIGHT / 2 + HELMET_RADIUS,
            HELMET_RADIUS + 4, HELMET_RADIUS + 4,
            0,
            2 * Math.PI / 6, 4 * Math.PI / 6
        );
        renderingContext.stroke();
        renderingContext.restore();
    };

    let drawArm = (renderingContext, isLeft, decimalExtended, rotationDegrees) => {
        renderingContext.save();
        renderingContext.strokeStyle = 'black';
        renderingContext.fillStyle = '#30e593';
        renderingContext.lineWidth = 3;

        let topStartY = ARM_TOP_Y,
            topStartX,
            bottomStartY = ARM_BOTTOM_Y,
            bottomStartX,
            armLength,
            controlPointBottomX,
            controlPointBottomY,
            controlPointTopX,
            controlPointTopY,
            controlPointCenterX,
            controlPointCenterY,
            controlPointXOffset,
            controlPointYOffset,
            angle;

        if (isLeft) {
            topStartX = -BODY_WIDTH / 2 + 5;
        } else {
            topStartX = BODY_WIDTH / 2 - 5;
        }

        bottomStartX = topStartX;

        armLength = ARM_RETRACTED + (ARM_EXTENDED - ARM_RETRACTED) * decimalExtended;

        if (isLeft) {
            armLength *= -1;
        }

        // to "rotate" arms
        controlPointCenterX = topStartX + armLength;
        controlPointCenterY = (bottomStartY - topStartY) / 2 + topStartY;

        // armLength = Math.sqrt(Math.pow(controlPointCenterX, 2) + Math.pow(controlPointCenterY, 2));
        angle = rotationDegrees || 0.0;
        angle = angle * Math.PI / 180;

        controlPointCenterX = Math.cos(angle) * armLength + topStartX;

        if (isLeft && controlPointCenterX > 0) {
            controlPointCenterX *= -1.0;
        }

        controlPointCenterY = (bottomStartY - topStartY) / 2 + topStartY - Math.sin(angle) * armLength;

        controlPointXOffset = Math.sin(angle) * ARM_HEIGHT / 2;
        controlPointYOffset = Math.cos(angle) * ARM_HEIGHT / 2;

        if (isLeft) {
            controlPointBottomX = controlPointCenterX - controlPointXOffset;
            controlPointTopX = controlPointCenterX + controlPointXOffset;

            if (angle <= 0) {
                controlPointBottomY = bottomStartY;
                controlPointTopY = controlPointCenterY - controlPointYOffset;
            } else {
                controlPointTopY = topStartY;
                controlPointBottomY = controlPointCenterY + controlPointYOffset;
            }
        } else {
            controlPointBottomX = controlPointCenterX - controlPointXOffset;
            controlPointTopX = controlPointCenterX + controlPointXOffset;

            if (angle <= 0) {
                controlPointTopY = topStartY;
                controlPointBottomY = controlPointCenterY + controlPointYOffset;
            } else {
                controlPointTopY = controlPointCenterY - controlPointYOffset;
                controlPointBottomY = bottomStartY;
            }
        }

        renderingContext.beginPath();
        renderingContext.moveTo(topStartX, topStartY);
        renderingContext.bezierCurveTo(
            controlPointTopX, controlPointTopY,
            controlPointBottomX, controlPointBottomY,
            bottomStartX, bottomStartY
        );
        renderingContext.stroke();
        renderingContext.closePath();
        renderingContext.fill();
        renderingContext.restore();
    };
    // Expose default parameter values
    SampleSpriteLibrary.defaults = SampleSpriteLibrary.defaults || {};
    SampleSpriteLibrary.defaults["alien"] = {
        armLExtension: 0.0,
        armRExtension: 0.0,
        armLRotation: 0.0,
        armRRotation: 0.0,
        pupilPosDecimal: 0.0
    };

    SampleSpriteLibrary.alien = (alienSpec) => {
        let renderingContext = alienSpec.renderingContext,
            armLExtension = alienSpec.armLExtension || 0.0,
            armRExtension = alienSpec.armRExtension || 0.0,
            armLRotation = alienSpec.armLRotation || 0.0,
            armRRotation = alienSpec.armRRotation || 0.0,
            pupilPosDecimal = alienSpec.pupilPosDecimal || 0.0;

        renderingContext.save();
        drawBody(renderingContext, pupilPosDecimal);
        drawHelmet(renderingContext);
        drawArm(renderingContext, true, armLExtension, armLRotation);
        drawArm(renderingContext, false, armRExtension, armRRotation);
        renderingContext.restore();
    };
})();
