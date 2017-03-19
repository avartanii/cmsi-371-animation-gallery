(() => {
    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - width: the width of the canvas element
    // - height: the height of the canvas element
    // - scene: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          is to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    let initializeAnimation = (settings) => {
        // We need to keep track of the current frame.
        let currentFrame = 0;
        // Avoid having to go through settings to get to the
        // rendering context and sprites.
        let renderingContext = settings.renderingContext;
        let width = settings.width;
        let height = settings.height;
        let scene = settings.scene;
        let placeHolder = {};
        let notArbritary = ["tx", "ty", "sx", "sy", "rotate", "ease"];

        for (let i = 0, maxI = scene.length; i < maxI; i += 1) {
            let sprite = scene[i]["sprite"];
            if (!(sprite in placeHolder)) {
                placeHolder[sprite] = {};
            }
            for (let j = 0, maxJ = scene[i].keyframes.length; j < maxJ; j += 1) {
                let currentProperties = scene[i].keyframes[j];
                for (let value in currentProperties) {
                    if (currentProperties.hasOwnProperty(value)) {
                        if (!(value in placeHolder[sprite])) {
                            placeHolder[sprite][value] = {};
                        }
                        placeHolder[sprite][value][currentProperties.frame] = currentProperties[value];
                    }
                }
            }
        }
        let previousTimestamp = null;

        let nextFrame = (timestamp) => {

            let mostRecentFrame = (sprite, prop, defaultValue) => {
                if (placeHolder[sprite].hasOwnProperty(prop)) {
                    let data = placeHolder[sprite][prop];
                    let previousFrame = 0;
                    for (let frame in data) {
                        if (frame > currentFrame) {
                            return {val: (data[previousFrame]), frame: previousFrame};
                        } else {
                            previousFrame = frame;
                        }
                    }
                    return {val: data[previousFrame], frame: currentFrame};
                } else {
                    return {val: defaultValue, frame: currentFrame};
                }
            };

            let futureFrame = (sprite, attribute, defaultVal) => {
                if (placeHolder[sprite].hasOwnProperty(attribute)) {
                    let data = placeHolder[sprite][attribute];
                    let finalFrame = 0;
                    for (let frame in data) {
                        if (data.hasOwnProperty(frame)) {
                            if (frame > currentFrame) {
                                return {val: data[frame], frame: frame};
                            } else if (frame < currentFrame) {
                                finalFrame = frame;
                            }
                        }
                    }
                    return {val: data[finalFrame], frame: finalFrame};
                } else {
                    return {val: defaultVal, frame: currentFrame};
                }
            };

            // Bail-out #1: We just started.
            if (!previousTimestamp) {
                previousTimestamp = timestamp;
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Bail-out #2: Too soon.
            if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 24))) {
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Clear the canvas.
            renderingContext.clearRect(0, 0, width, height);


            // For every sprite, go to the current pair of keyframes.
            // Then, draw the sprite based on the current frame.
            for (let i = 0, maxI = scene.length; i < maxI; i += 1) {
                let sprite = scene[i]["sprite"];
                for (let j = 0, maxJ = scene[i].keyframes.length - 1; j < maxJ; j += 1) {
                    // We look for keyframe pairs such that the current
                    // frame is between their frame numbers.
                    if ((scene[i].keyframes[j].frame <= currentFrame) &&
                            (currentFrame <= scene[i].keyframes[j + 1].frame)) {

                        // Save the rendering context state.
                        renderingContext.save();

                        // Set up our start and distance values, using defaults
                        // if necessary.
                        let endFrame = futureFrame(sprite, "ease", "linear");
                        let ease = KeyframeTweener[endFrame.val || "linear"];

                        let startFrame = mostRecentFrame(sprite, "tx", 0);
                        endFrame = futureFrame(scene[i]["sprite"], "tx", 0);

                        let txStart = startFrame.val;
                        let txDistance = endFrame.val - txStart;
                        let txTweenFrame = currentFrame - startFrame.frame;
                        let txDuration = endFrame.frame - startFrame.frame + 1;
                        startFrame = mostRecentFrame(sprite, "ty", 0);
                        endFrame = futureFrame(sprite, "ty", 0);
                        let tyStart = startFrame.val;
                        let tyDistance = endFrame.val - tyStart;
                        let tyTweenFrame = currentFrame - startFrame.frame;
                        let tyDuration = endFrame.frame - startFrame.frame;
                        startFrame = mostRecentFrame(sprite, "sx", 1);
                        endFrame = futureFrame(sprite, "sx", 1);
                        let sxStart = startFrame.val;
                        let sxDistance = endFrame.val - sxStart;
                        let sxTweenFrame = currentFrame - startFrame.frame;
                        let sxDuration = endFrame.frame - startFrame.frame;
                        startFrame = mostRecentFrame(sprite, "sy", 1);
                        endFrame = futureFrame(sprite, "sy", 1);
                        let syStart = startFrame.val;
                        let syDistance = endFrame.val - syStart;
                        startFrame = mostRecentFrame(sprite, "rotate", 0);
                        endFrame = futureFrame(sprite, "rotate", 0);
                        let syTweenFrame = currentFrame - startFrame.frame;
                        let syDuration = endFrame.frame - startFrame.frame;
                        let rotateStart = startFrame.val * Math.PI / 180;
                        let rotateDistance = endFrame.val * Math.PI / 180 - rotateStart;
                        let rotateTweenFrame = currentFrame - startFrame.frame;
                        let rotateDuration = endFrame.frame - startFrame.frame;

                        let getEaseFunction = (property) => {
                            let startFrame = mostRecentFrame(sprite, property, 0);
                            let endFrame = futureFrame(sprite, property, 0);
                            let start = startFrame.val;
                            let distance = endFrame.val - start;
                            let currentTweenFrame = currentFrame - startFrame.frame;
                            let duration = endFrame.frame - startFrame.frame;
                            return ease(currentTweenFrame, start, distance, duration);
                        };
                        
                        let easeValues = {};

                        for (let property in placeHolder[sprite]) {
                            if (!(property in notArbritary) && !(property === "frame")) {
                                let value = getEaseFunction(property);
                                if (value !== null) {
                                    easeValues[property] = value;
                                }
                            }
                        }
                        
                        // Build our transform according to where we should be.
                        renderingContext.translate(
                            ease(txTweenFrame, txStart, txDistance, txDuration),
                            ease(tyTweenFrame, tyStart, tyDistance, tyDuration)
                        );

                        renderingContext.rotate(
                            ease(rotateTweenFrame, rotateStart, rotateDistance, rotateDuration)
                        );

                        renderingContext.scale(
                            ease(sxTweenFrame, sxStart, sxDistance, sxDuration),
                            ease(syTweenFrame, syStart, syDistance, syDuration)
                        );
                        
                        // Draw the sprite.
                        
                        SampleSpriteLibrary[scene[i].sprite]({
                            renderingContext,
                            easeValues
                        });

                        // Clean up.
                        renderingContext.restore();
                    }
                }
            }

            // Move to the endFrame frame.
            currentFrame += 1;
            previousTimestamp = timestamp;
            window.requestAnimationFrame(nextFrame);
        };

        window.requestAnimationFrame(nextFrame);
    };

    window.KeyframeTweener = {
        // The module comes with a library of common easing functions.
        linear: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete + start;
        },

        quadEaseIn: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete * percentComplete + start;
        },

        quadEaseOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return -distance * percentComplete * (percentComplete - 2) + start;
        },

        quadEaseInAndOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / (duration / 2);
            return (percentComplete < 1) ?
                    (distance / 2) * percentComplete * percentComplete + start :
                    (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
        },

        easeOutBounce: (currentTime, start, distance, duration) => {
            if ((currentTime /= duration) < (1 / 2.75)) {
                return distance * (7.5625 * currentTime * currentTime) + start;
            } else if (currentTime < (2 / 2.75)) {
                return distance * (7.5625 * (currentTime -= (1.5 / 2.75)) * currentTime + .75) + start;
            } else if (currentTime < (2.5 / 2.75)) {
                return distance * (7.5625 * (currentTime -= (2.25 / 2.75)) * currentTime + .9375) + start;
            } else {
                return distance * (7.5625 * (currentTime -= (2.625 / 2.75)) * currentTime + .984375) + start;
            }
        },

        easeOutCirc: (currentTime, start, distance, duration) => {
            return distance * Math.sqrt(1 - (currentTime = currentTime / duration - 1) * currentTime) + start;
        },
        initialize: initializeAnimation
    };
})();