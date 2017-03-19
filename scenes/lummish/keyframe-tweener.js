/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */
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

        // Set up keyframepairs for skipping
        let keyframePairs = {};

        for (let i = 0; i < scene.length; i++) {
            keyframePairs[scene[i].sprite] = [];

            for (let j = 0; j < scene[i].keyframes.length; j++) {
                keyframePairs[scene[i].sprite].push({});
            }
        }

        for (let i = 0; i < scene.length; i++) {
            let keyframes = scene[i].keyframes,
                sprite = scene[i].sprite;

            for (let j = 0; j < keyframes.length - 1; j++) {
                for (let prop in keyframes[j]) {
                    // check preceding frames
                    if (j > 0 && typeof keyframePairs[sprite][0][prop] === "undefined") {
                        for (let n = 0; n < j; n++) {
                            keyframePairs[sprite][n][prop] = {start: 0, end: j};
                        }
                    }
                    for (let k = j + 1; k < keyframes.length; k++) {
                        if (typeof keyframes[k][prop] !== "undefined") {
                            for (let n = j; n <= k; n++) {
                                // each keyframe between previously defined and most recently defined
                                // should have these start and end points
                                keyframePairs[sprite][n][prop] = {start: j, end: k};
                            }
                            break;
                        }
                    }
                    // If trailing keyframe properties unset, use final keyframe as end
                    if (!keyframePairs[sprite][j + 1][prop]) {
                        for (let n = j; n < keyframes.length; n++) {
                            keyframePairs[sprite][n][prop] = {start: j, end: keyframes.length - 1};
                        }
                    }
                }
            }

            // make sure last property has start and end
            for (let prop in keyframes[keyframes.length - 1]) {
                if (keyframes.length > 1 && typeof keyframePairs[sprite][keyframes.length - 1][prop] === "undefined") {
                    let startEnd = {
                        start: keyframes.length - 2,
                        end: keyframes.length - 1
                    };

                    keyframePairs[sprite][keyframes.length - 2][prop] = startEnd;
                    keyframePairs[sprite][keyframes.length - 1][prop] = startEnd;
                }
            }
        }

        let prepTween = (sprite, prop, startFrame, currentFrame) => {
            let startAndEndFrames = keyframePairs[sprite.sprite][startFrame];
            let defaultVal = defaults[prop];
            if (typeof defaultVal === "undefined") {
                defaultVal = SampleSpriteLibrary.defaults[sprite.sprite][prop];
            }

            // return currentTweenFrame, start, distance, duration and ease
            let startKeyframe,
                endKeyframe,
                start,
                distance,
                tweenFrame,
                duration,
                ease;

            if (typeof startAndEndFrames[prop] !== "undefined") {
                startKeyframe = sprite.keyframes[startAndEndFrames[prop].start];
                endKeyframe = sprite.keyframes[startAndEndFrames[prop].end];

                // how to control for specification case?
                // need to control for edge cases where start defined but not end, end but not start
                if (prop === "rotate") {
                    start = (startKeyframe[prop] || defaultVal) * Math.PI / 180;
                    distance = (endKeyframe[prop] || defaultVal) * Math.PI / 180 - start;
                } else {
                    // allow for start and distance to be 0
                    start = typeof startKeyframe[prop] === "undefined" ? defaultVal : startKeyframe[prop];
                    distance = typeof endKeyframe[prop] === "undefined" ? defaultVal : endKeyframe[prop];
                    distance -= start;
                }

                tweenFrame = currentFrame - startKeyframe.frame;
                duration = endKeyframe.frame - startKeyframe.frame + 1;
                ease = KeyframeTweener[startKeyframe.ease || "linear"];
            } else {
                // edge cases???
                startKeyframe = sprite.keyframes[startFrame];
                endKeyframe = sprite.keyframes[startFrame + 1];

                start = defaultVal;
                distance = defaultVal - start;
                tweenFrame = currentFrame - startKeyframe.frame; // use tweenframe instead
                duration = endKeyframe.frame - startKeyframe.frame + 1;
                ease = KeyframeTweener[startKeyframe.ease || "linear"];
            }


            return {
                tweenFrame: tweenFrame,
                start: start,
                distance: distance,
                duration: duration,
                ease: ease
            };
        };

        let defaults = {
            "tx": 0,
            "ty": 0,
            "sx": 1,
            "sy": 1,
            "rotate": 0
        };

        let applyEase = (spec) => {
            return spec.ease(spec.tweenFrame, spec.start, spec.distance, spec.duration);
        };

        let tweenAll = (sprite, startFrame, properties, currentFrame) => {
            let tweeningSpec = {};
            let spriteSpec = {renderingContext: renderingContext};

            for (let prop in properties) {
                if (prop !== "frame" && prop !== "ease") {
                    tweeningSpec[prop] = prepTween(sprite, prop, startFrame, currentFrame);
                    if (prop !== "tx" && prop !== "ty" && prop !== "rotate" &&
                        prop !== "sx" && prop !== "sy" && prop !== "ease") {
                        spriteSpec[prop] = applyEase(tweeningSpec[prop]);
                    }
                }
            }

            // if transforms have not been initialized, do so
            for (let transform in defaults) {
                if (!tweeningSpec[transform]) {
                    tweeningSpec[transform] = prepTween(sprite, transform, startFrame, currentFrame);
                }
            }

            renderingContext.translate(
                applyEase(tweeningSpec.tx),
                applyEase(tweeningSpec.ty)
            );

            renderingContext.rotate(
                applyEase(tweeningSpec.rotate)
            );

            renderingContext.scale(
                applyEase(tweeningSpec.sx),
                applyEase(tweeningSpec.sy)
            );

            SampleSpriteLibrary[sprite.sprite](spriteSpec);
        };

        let previousTimestamp = null;
        let nextFrame = (timestamp) => {
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
                for (let j = 0, maxJ = scene[i].keyframes.length - 1; j < maxJ; j += 1) {
                    // We look for keyframe pairs such that the current
                    // frame is between their frame numbers.
                    if ((scene[i].keyframes[j].frame <= currentFrame) &&
                            (currentFrame <= scene[i].keyframes[j + 1].frame)) {

                        let startAndEndFrames = keyframePairs[scene[i].sprite][j];

                        // Save the rendering context state.
                        renderingContext.save();

                        tweenAll(scene[i], j, startAndEndFrames, currentFrame);

                        // Clean up.
                        renderingContext.restore();
                    }
                }
            }

            // Move to the next frame.
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

        sineEaseIn: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return -distance * Math.cos(percentComplete * (Math.PI / 2)) + distance + start;
        },

        sineEaseOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * Math.sin(percentComplete * (Math.PI / 2)) + start;
        },

        sineEaseInOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return -distance / 2 * (Math.cos(Math.PI * percentComplete) - 1) + start;
        },

        initialize: initializeAnimation
    };
})();
