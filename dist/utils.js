"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isDefined = void 0;
/**
 * Checks if a given value is defined.
 * @param value The value to be checked.
 * @returns True if the value is defined, otherwise false.
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
/**
 * Checks if a given value is a real number meaning any number without the NaN special value.
 * @param value The value to be checked.
 * @returns True if the value is a real number, otherwise false.
 */
function isNumber(value) {
    return isDefined(value) && typeof value === "number" && !isNaN(value);
}
exports.isNumber = isNumber;
