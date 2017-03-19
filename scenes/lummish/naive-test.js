(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");

    // Lander
    let landerx = canvas.width / 2,
        landery = canvas.height / 2,
        decimalLegExtended = 0,
        decimalRampExtended = 0,
        decimalOpen = 0,
        extendRamp = true,
        landerRotation = 0;


    // Astronaut
    let astronautX = canvas.width / 3,
        astronautY = canvas.height / 2,
        rotationDegrees = {
            lDeg: 0,
            rDeg: 0
        },
        rotateArmsUp = true,
        astronautScale = 1,
        biggerAstronaut = true;

    // Alien
    let alienX = 2 * canvas.width / 3,
        alienY = canvas.height / 2,
        armLExtension = 0,
        armRExtension = 0,
        armLRotation = 0,
        armRRotation = 0,
        leftArmUp = true,
        extendArms = true,
        alienRotation = 0;

    const FRAME_DURATION = 30; // In milliseconds.

    let lastTimestamp = 0;

    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }

        lastTimestamp = timestamp;

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);

        // Lander
        renderingContext.save();
        renderingContext.translate(landerx, landery);
        renderingContext.rotate(landerRotation);
        SampleSpriteLibrary.lander({
            renderingContext,
            decimalLegExtended,
            decimalOpen,
            decimalRampExtended,
        });
        renderingContext.restore();

        // Astronaut
        renderingContext.save();
        renderingContext.translate(astronautX, astronautY);
        renderingContext.scale(astronautScale, astronautScale);
        SampleSpriteLibrary.astronaut({
            renderingContext,
            rotationDegrees,
        });
        renderingContext.restore();

        // Alien
        renderingContext.save();
        renderingContext.translate(alienX, alienY);
        renderingContext.rotate(alienRotation);
        SampleSpriteLibrary.alien({
            renderingContext,
            armLExtension,
            armRExtension,
            armLRotation,
            armRRotation
        });
        renderingContext.restore();

        // Totally repetitive, arbitrary, magic-numbered, just-show-it-works variable update code.

        // Lander
        if (decimalLegExtended < 1) {
            decimalLegExtended += 0.01;
            decimalOpen += 0.01;
        } else {
            if (extendRamp && decimalRampExtended < 1) {
                decimalRampExtended += 0.01;
            } else if (decimalRampExtended > 0) {
                extendRamp = false;
                decimalRampExtended -= 0.01;
            } else {
                extendRamp = true;
            }
        }

        landerRotation += 1 * Math.PI / 180;

        // Astronaut
        if (rotateArmsUp && rotationDegrees.lDeg < 70) {
            rotationDegrees.lDeg += 1;
            rotationDegrees.rDeg -= 1;
        } else if (rotationDegrees.lDeg > 0) {
            rotateArmsUp = false;
            rotationDegrees.lDeg -= 1;
            rotationDegrees.rDeg += 1;
        } else {
            rotateArmsUp = true;
        }

        if (biggerAstronaut && astronautScale < 2) {
            astronautScale += 0.01;
        } else if (astronautScale > 1) {
            biggerAstronaut = false;
            astronautScale -= 0.01;
        } else {
            biggerAstronaut = true;
        }

        // Alien
        if (leftArmUp && armLRotation > -70) {
            armLRotation -= 1;
            armRRotation += 1;
        } else if (armLRotation < 70) {
            leftArmUp = false;
            armLRotation += 1;
            armRRotation -= 1;
        } else {
            leftArmUp = true;
        }

        if (extendArms && armLExtension < 1) {
            armLExtension += 0.01;
            armRExtension += 0.01;
        } else if (armLExtension > 0) {
            extendArms = false;
            armLExtension -= 0.01;
            armRExtension -= 0.01;
        } else {
            extendArms = true;
        }

        alienRotation -= 1 * Math.PI / 180;


        window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
