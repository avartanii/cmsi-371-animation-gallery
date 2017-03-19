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

        // PREPROCESSING
        const DEFAULT_TRANSFORMS = ["tx", "ty", "sx", "sy", "rotate", "ease"];

        let scanTransforms = (scene) => {
            let allTransforms = [];
            for (let i = 0; i < scene.length; i++) {
                let object = {
                    defaultTransforms: [],
                    defaultLocations: {
                        "tx": [],
                        "ty": [],
                        "sx": [],
                        "sy": [],
                        "rotate": [],
                        "ease": []
                    },
                    customTransforms: [],
                    framesArray: []
                };
                for (let j = 0; j < scene[i].keyframes.length; j++) {
                    let keyframe = scene[i].keyframes[j];
                    let keysArray = Object.keys(keyframe);
                    for (let k = 1; k < keysArray.length; k++) {
                        if (DEFAULT_TRANSFORMS.includes(keysArray[k])) {
                            object.defaultTransforms.push(keysArray[k]);
                            object.defaultLocations[keysArray[k]].push(j);
                        } else {
                            object.customTransforms.push(keysArray[k]);
                        }
                    }
                    object.framesArray.push(keyframe.frame);
                }
                object.defaultTransforms = object.defaultTransforms.filter(onlyUnique);
                object.customTransforms = object.customTransforms.filter(onlyUnique);
                allTransforms.push(object);
            }
            return allTransforms;
        };

        let onlyUnique = (value, index, array) => {
            return array.indexOf(value) === index;
        };

        let scanCustomParameters = (scene, transforms) => {
            let allCustomLocations = [];
            for (let i = 0; i < scene.length; i++) {
                let customTransformsArray = transforms[i].customTransforms;
                let customLocations = {};
                for (let j = 0; j < customTransformsArray.length; j++) {
                    customLocations[customTransformsArray[j]] = [];
                }
                for (let k = 0; k < scene[i].keyframes.length; k++) {
                    let keyframe = scene[i].keyframes[k];
                    let keysArray = Object.keys(keyframe);
                    for (let l = 0; l < keysArray.length; l++) {
                        if (customTransformsArray.includes(keysArray[l])) {
                            customLocations[keysArray[l]].push(k);
                        }
                    }
                }
                allCustomLocations.push(customLocations);
            }
            return allCustomLocations;
        };

        // returns the index of the start and end keyframe
        let keyframeAnalyzer = (
            currentFrame,
            propertyName,
            spriteIndex,
            transforms,
            customLocations,
            isCustomProperty
        ) => {
            let customArray = customLocations[spriteIndex][propertyName];
            let defaultArray = transforms[spriteIndex].defaultLocations[propertyName];
            let locationsArray = isCustomProperty ? customArray : defaultArray;
            // let locationsArray = transforms[spriteIndex].defaultLocations[propertyName];
            let values = transforms[spriteIndex].framesArray;
            if (currentFrame > values[locationsArray[locationsArray.length - 1]] || locationsArray.length === 1) {
                return {
                    start: locationsArray[locationsArray.length - 1],
                    end: null
                };
            } else if (currentFrame < values[locationsArray[0]]) {
                return {
                    start: null,
                    end: null
                };
            } else {
                for (let i = 0; i < locationsArray.length - 1; i++) {
                    if (currentFrame >= values[locationsArray[i]] && currentFrame <= values[locationsArray[i + 1]]) {
                        return {
                            start: locationsArray[i],
                            end: locationsArray[i + 1]
                        };
                    }
                }
                return {
                    start: null,
                    end: null
                };
            }
        };

        let transforms = scanTransforms(scene);
        let customLocations = scanCustomParameters(scene, transforms);

        let previousTimestamp = null;
        let nextFrame = (timestamp) => {
            // Bail-out #1: We just started.
            if (!previousTimestamp) {
                previousTimestamp = timestamp;
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Bail-out #2: Too soon.
            if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 40))) {
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Clear the canvas.
            renderingContext.clearRect(0, 0, width, height);

            // Draw the sky
            renderingContext.save();
            renderingContext.rect(0, 0, width, height);
            renderingContext.fillStyle = "#CBEBF6";
            renderingContext.fill();
            renderingContext.restore();

            let easeCalculator = (result, i, property) => {
                let startKeyframe, endKeyframe;
                if (result.start === null && result.end === null) {
                    return null;
                } else if (result.start !== null && result.end === null) {
                    startKeyframe = scene[i].keyframes[result.start];
                    endKeyframe = scene[i].keyframes[result.start];

                } else {
                    startKeyframe = scene[i].keyframes[result.start];
                    endKeyframe = scene[i].keyframes[result.end];
                }

                let ease = KeyframeTweener[startKeyframe.ease || "linear"];
                let currentTweenFrame = currentFrame - startKeyframe.frame;
                let duration = endKeyframe.frame - startKeyframe.frame + 1;

                let start = startKeyframe[property];
                let distance = (endKeyframe[property] - start) ? (endKeyframe[property] - start) : 0;

                return ease(currentTweenFrame, start, distance, duration);
            };

            // for all the sprites
            for (let i = 0; i < scene.length; i++) {
                let length = transforms[i].framesArray.length;
                let minFrame = transforms[i].framesArray[0];
                let maxFrame = transforms[i].framesArray[length - 1];
                // if the sprite is present in the currentFrame
                if (currentFrame >= minFrame && currentFrame <= maxFrame) {
                    renderingContext.save();
                    let defaultTransformValues = [DEFAULT_TRANSFORMS.length];

                    // Fill in eased array for default transforms
                    // Loop through all the default transforms detected
                    for (let k = 0; k < transforms[i].defaultTransforms.length; k++) {
                        let property = transforms[i].defaultTransforms[k];
                        let index = DEFAULT_TRANSFORMS.indexOf(property);
                        let result = keyframeAnalyzer(currentFrame, property, i, transforms, customLocations, false);
                        defaultTransformValues[index] = easeCalculator(result, i, property);
                    }

                    // Fill in eased object for custom transforms
                    let customTransformObject = {
                        renderingContext: renderingContext
                    };

                    // for all the custom properties
                    for (let l = 0; l < transforms[i].customTransforms.length; l++) {
                        let property = transforms[i].customTransforms[l];
                        let result = keyframeAnalyzer(currentFrame, property, i, transforms, customLocations, true);
                        let value = easeCalculator(result, i, property);
                        if (value !== null) {
                            customTransformObject[property] = value;
                        }
                    }

                    renderingContext.translate(
                        defaultTransformValues[0] || 0,
                        defaultTransformValues[1] || 0
                    );

                    renderingContext.rotate(
                        defaultTransformValues[4] * Math.PI / 180 || 0
                    );

                    renderingContext.scale(
                        defaultTransformValues[2] || 1.0,
                        defaultTransformValues[3] || 1.0
                    );

                    // Draw the sprite.
                    SampleSpriteLibrary[scene[i].sprite](customTransformObject);

                    // Clean up.
                    renderingContext.restore();

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

        // CUSTOM EASING FUNCTIONS
        // t: current time, b: start, c: distance, d: duration
        easeInCirc: (currentTime, start, distance, duration) => {
            return -distance * (Math.sqrt(1 - (currentTime /= duration) * currentTime) - 1) + start;
        },

        easeInSine: (currentTime, start, distance, duration) => {
            return -distance * Math.cos(currentTime / duration * (Math.PI / 2)) + distance + start;
        },

        // NON MONOTONIC ONES (used for balloons):
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

        easeInOutCirc: function (currentTime, start, distance, duration) {
    		if ((currentTime /= duration / 2) < 1) {
                return - distance / 2 * (Math.sqrt(1 - currentTime * currentTime) - 1) + start;
            }
    		return currentTime / 2 * (Math.sqrt(1 - (currentTime -= 2) * currentTime) + 1) + start;
    	},

        initialize: initializeAnimation
    };
})();
