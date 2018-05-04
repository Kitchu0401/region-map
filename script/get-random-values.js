/**
 * Generate random data from source frame.
 * Process different based on property type.
 * 
 *  - function: return function-applied value. 
 *  - object: return result of recursive call.
 *  - else: bind source's property without any process.
 * 
 * @param {Object} frame Object which will be base for generated data.
 * @param {Number} quantity Amount of data.
 */
function generateRandomData (frame, quantity) {
    var copyObject = function (target, source) {
        return Object.keys(source).reduce(function (newObject, key) {
            switch (typeof source[key]) {
                case 'function':
                    newObject[key] = source[key]();
                    break;
                case 'object':
                    newObject[key] = copyObject({}, source[key]);
                    break;
                default:
                    newObject[key] = source[key] || '';
                    break;
            }
            
            return newObject;
        }, target);
    };

    var generatedData = [];
    for (var i = 0; i < quantity; i++) {
        generatedData.push(copyObject({}, frame));
    }
    return generatedData;
}

/**
 * Generate random int value.
 * 
 * @param {Number} min Lower limit of result value.
 * @param {Number} max Uower limit of result value.
 */
function getRandomInt (min, max) {
    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 0;
    return Math.floor(Math.random() * (max + 1) - min);
}

/**
 * Return random index from array.
 * 
 * @param {Array} array Array object for retrieving index.
 */
function getRandomIndex (array) {
    return Math.floor(Math.random() * array.length);
}

/**
 * Return random key from object.
 * 
 * @param {Object} set Object for retrieving key. Can be Array object.
 */
function getRandomKey (set) {
    if (set instanceof Array) return getRandomIndex(set);
    else if (set instanceof Object) return Object.keys(set)[getRandomIndex(Object.keys(set))];
    else return null;
}

/**
 * Return random value from object.
 * 
 * @param {Object} set Object for retrieving key. Can be Array object.
 * @param {*} notThis Value to avoid in result.
 * @see getRandomKey
 */
function getRandomValue (set, notThis) {
    while (true) {
        var randomKey = getRandomKey(set);
        var randomValue = randomKey != null ? set[randomKey] : null;
        if (randomValue !== notThis) return randomValue;
    }
}
