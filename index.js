var _overriden = false;

var consoleWrapper = function (func, identifyCaller) {
    var orig = console[func];
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var caller = '';
        if (identifyCaller) {
            caller = getOriginalCaller();
            args.push(caller);
        }
        var values = [new Date().toISOString(), func.toUpperCase()];
        orig.apply(console, values.concat(args));
    };
}

var consoleErrorWrapper = function () {
    var orig = console.error;
    return function () {
        var err = Array.prototype.slice.call(arguments);
        var caller = getOriginalCaller(err);
        var values = [
            new Date().toISOString(),
            'ERROR',
            caller,
            err,
            err.stack
        ];
        orig.apply(console, values);
    };
}

/**
 * Returns the appropriate function listing from a stacktrace.
 * If an error object is passed, it's stacktrace is used.
 * If no error object was passed, a stacktrace will be created (dependent on config).
 * @param {Error} error - the current error that is being logged.
 */
function getOriginalCaller (error) {
    var stack;
    // Index 0 - Error message
    // Index 1 - The current function
    // Index 2 - The console wrapper function
    // Index 3 - Original calling function
    var stackIndex = 1;
    if (error === undefined) {
        stack = new Error().stack;
        stackIndex = 3;
    } else {
        stack = error.stack;
    }

    var stackLine = stack.split('\n')[stackIndex];
    var fileName = stackLine.split(' ').pop();
    var cleanFileName = fileName.replace(/[()]/g, '');
    return cleanFileName;
}

/**
 * Overrides the console functions
 * with the wrappers
 */
function override (identifyCaller) {
    identifyCaller = identifyCaller || false;
    console.log = consoleWrapper('log', identifyCaller);
    console.info = consoleWrapper('info', identifyCaller);
    console.warn = consoleWrapper('warn', identifyCaller);
    console.error = consoleErrorWrapper;
}

module.exports.override = function (identifyCaller) {
    // Only override the console functions once
    if (!_overriden) {
        override(identifyCaller)
        _overriden = true;
    }
}
