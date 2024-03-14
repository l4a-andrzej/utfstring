"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtfVisualString = void 0;
const utf_string_1 = require("./utf_string");
/** Regular expression for matching regional indicator pairs. */
const regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;
/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
function createRegionalIndicatorAndSurrogatePairScanner() {
    return new RegExp(regionalIndicatorPairs.source + "|" + utf_string_1.surrogatePairs.source, "g");
}
/**
 * Creates a regular expression that matches regional indicator pairs and surrogate pairs.
 * @returns The regular expression that matches regional indicator pairs and surrogate pairs.
 */
function createUtfSafeCharScannerHandingRegionalIndicatorPairsAndSurrogatePairs() {
    const sources = new Array();
    sources.push(regionalIndicatorPairs.source);
    sources.push(utf_string_1.surrogatePairs.source);
    sources.push("[^]");
    return new RegExp(sources.join("|"), "g");
}
/**
 * Class with UTF-safe string operations that treats regional indicator pairs as one character.
 */
class UtfVisualString extends utf_string_1.UtfString {
    /**
     * Creates a char scanner that matches unsafe UTF chars.
     * @returns A char scanner that matches unsafe UTF chars.
     */
    static createUnsafeUtfCharFinder() {
        return createRegionalIndicatorAndSurrogatePairScanner();
    }
    /**
     * Creates a UTF-safe char scanner.
     * @returns A UTF-safe char scanner.
     */
    static createUtfSafeCharScanner() {
        return createUtfSafeCharScannerHandingRegionalIndicatorPairsAndSurrogatePairs();
    }
}
exports.UtfVisualString = UtfVisualString;
