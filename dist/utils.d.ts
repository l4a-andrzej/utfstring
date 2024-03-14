/**
 * Checks if a given value is defined.
 * @param value The value to be checked.
 * @returns True if the value is defined, otherwise false.
 */
export declare function isDefined<T>(value: T | undefined | null): value is T;
/**
 * Checks if a given value is a real number meaning any number without the NaN special value.
 * @param value The value to be checked.
 * @returns True if the value is a real number, otherwise false.
 */
export declare function isNumber(value: unknown): value is number;
