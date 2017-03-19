(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    const
        SIDE_LENGTH = 100,
        HEIGHT = 172,
        ROCKET_HEIGHT = 10,
        ROCKET_WIDTH = 80,
        WINDOW_RADIUS = 25,
        LEG_CONNECT_SLOPE_MAG = 43 / 25,
        LEG_CONNECT_START_Y = 26,
        LEG_CONNECT_END_Y = LEG_CONNECT_START_Y + 15 * LEG_CONNECT_SLOPE_MAG,
        LEG_RETRACTED_Y = 80,
        LEG_RETRACTED_X_MAG = SIDE_LENGTH + 40,
        LEG_X_DIFF_MAG = 40,
        LEG_Y_DIFF = 40,
        FOOT_WIDTH = 50,
        FOOT_HEIGHT = 5,
        DOOR_WIDTH = 60,
        DOOR_HEIGHT = 65,
        RAMP_TOP_WIDTH = 60,
        RAMP_TOP_Y = 10 + DOOR_HEIGHT,
        RAMP_HEIGHT = HEIGHT - 75;

    let drawLanderBody = (renderingContext) => {
        renderingContext.save();

        // main body
        renderingContext.fillStyle = '#6d747f'; // body color
        renderingContext.strokeStyle = 'black'; // outline color
        renderingContext.lineWidth = 3;
        renderingContext.beginPath();
        renderingContext.moveTo(-SIDE_LENGTH / 2, -HEIGHT / 2);
        renderingContext.lineTo(SIDE_LENGTH / 2, -HEIGHT / 2);
        renderingContext.lineTo(SIDE_LENGTH, 0);
        renderingContext.lineTo(SIDE_LENGTH / 2, HEIGHT / 2);
        renderingContext.lineTo(-SIDE_LENGTH / 2, HEIGHT / 2);
        renderingContext.lineTo(-SIDE_LENGTH, 0);
        renderingContext.closePath();
        renderingContext.fill();
        renderingContext.stroke();

        // rocket housing
        renderingContext.beginPath();
        renderingContext.fillStyle = '#dadee5';
        renderingContext.rect(-ROCKET_WIDTH / 2, HEIGHT / 2, ROCKET_WIDTH, ROCKET_HEIGHT);
        renderingContext.fill();
        renderingContext.stroke();

        // lander window
        renderingContext.fillStyle = '#f1f975';
        renderingContext.beginPath();
        renderingContext.ellipse(0, -26, WINDOW_RADIUS, WINDOW_RADIUS, 0, 0, 2 * Math.PI);
        renderingContext.fill();
        renderingContext.stroke();


        // door hole
        renderingContext.fillStyle = 'black';
        renderingContext.beginPath();
        renderingContext.rect(-DOOR_WIDTH / 2, 10, DOOR_WIDTH, DOOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

    };

    let drawDoor = (renderingContext, decimalOpen) => {
        renderingContext.save();
        renderingContext.fillStyle = '#6d747f';
        renderingContext.strokeStyle = 'black';
        renderingContext.beginPath();
        renderingContext.rect(-DOOR_WIDTH / 2, 10, DOOR_WIDTH, DOOR_HEIGHT - (DOOR_HEIGHT * decimalOpen));
        renderingContext.fill();
        renderingContext.stroke();
        renderingContext.restore();
    };

    let drawRamp = (renderingContext, decimalExtended) => {
        renderingContext.save();
        renderingContext.fillStyle = '#dadee5';
        renderingContext.strokeStyle = 'black';
        renderingContext.lineWidth = 3;

        let rampXDiff = 5 * decimalExtended,
            rampLeftX = -RAMP_TOP_WIDTH / 2 - rampXDiff,
            rampRightX = RAMP_TOP_WIDTH / 2 + rampXDiff,
            rampBottomY = RAMP_TOP_Y + RAMP_HEIGHT * decimalExtended;
        renderingContext.beginPath();
        renderingContext.moveTo(-RAMP_TOP_WIDTH / 2, RAMP_TOP_Y);
        renderingContext.lineTo(RAMP_TOP_WIDTH / 2, RAMP_TOP_Y);
        renderingContext.lineTo(rampRightX, rampBottomY);
        renderingContext.lineTo(rampLeftX, rampBottomY);
        renderingContext.closePath();
        renderingContext.stroke();
        renderingContext.fill();
        renderingContext.restore();
    };

    let drawLanderLeg = (renderingContext, isLeft, decimalExtended) => {
        renderingContext.save();

        let legConnectStartX,
            legConnectEndX,
            legRetractedX,
            legXDiff,
            legSupportEndX;

        if (isLeft) {
            legConnectStartX = -SIDE_LENGTH + 15;
            legConnectEndX = legConnectStartX + 15;
            legRetractedX = -LEG_RETRACTED_X_MAG;
            legXDiff = -LEG_X_DIFF_MAG;
            legSupportEndX = legConnectStartX - 26;
        } else {
            legConnectStartX = SIDE_LENGTH - 15;
            legConnectEndX = legConnectStartX - 15;
            legRetractedX = LEG_RETRACTED_X_MAG;
            legXDiff = LEG_X_DIFF_MAG;
            legSupportEndX = legConnectStartX + 26;
        }

        let legXEnd = legRetractedX + decimalExtended * legXDiff,
            legYEnd = LEG_RETRACTED_Y + LEG_Y_DIFF * decimalExtended;

        // draw main leg
        renderingContext.save();
        renderingContext.strokeStyle = 'black'; // outline color
        renderingContext.lineWidth = 5;
        renderingContext.beginPath();
        renderingContext.moveTo(legConnectStartX, LEG_CONNECT_START_Y);
        renderingContext.lineTo(legXEnd, legYEnd);
        renderingContext.stroke();

        // draw support
        renderingContext.beginPath();
        renderingContext.moveTo(legConnectEndX, LEG_CONNECT_END_Y);
        renderingContext.lineTo(legSupportEndX, LEG_CONNECT_END_Y);
        renderingContext.stroke();
        renderingContext.restore();

        // draw foot
        renderingContext.translate(-legXEnd, legYEnd);
        renderingContext.fillStyle = '#dadee5';
        renderingContext.lineWidth = 3;
        renderingContext.rect(-FOOT_WIDTH / 2, 0, FOOT_WIDTH, FOOT_HEIGHT);
        renderingContext.stroke();
        renderingContext.restore();

        renderingContext.restore();
    };

    // Expose default parameter values
    SampleSpriteLibrary.defaults = SampleSpriteLibrary.defaults || {};
    SampleSpriteLibrary.defaults["lander"] = {
        decimalLegExtended: 0.0,
        decimalRampExtended: 0.0,
        decimalOpen: 0.0
    };

    SampleSpriteLibrary.lander = (landerSpec) => {
        let renderingContext = landerSpec.renderingContext,
            decimalLegExtended = landerSpec.decimalLegExtended || 0.0,
            decimalRampExtended = landerSpec.decimalRampExtended || 0.0,
            decimalOpen = landerSpec.decimalOpen || 0.0;

        renderingContext.save();
        drawLanderBody(renderingContext);
        drawDoor(renderingContext, decimalOpen);
        drawRamp(renderingContext, decimalRampExtended);
        drawLanderLeg(renderingContext, true, decimalLegExtended);
        drawLanderLeg(renderingContext, false, decimalLegExtended);
        renderingContext.restore();
    };
})();
