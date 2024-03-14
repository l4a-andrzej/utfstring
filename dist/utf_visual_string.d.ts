import { UtfString } from "./utf_string";
/**
 * Class with UTF-safe string operations that treats regional indicator pairs as one character.
 */
export declare class UtfVisualString extends UtfString {
    /**
     * Creates a char scanner that matches unsafe UTF chars.
     * @returns A char scanner that matches unsafe UTF chars.
     */
    protected static createUnsafeUtfCharFinder(): RegExp;
    /**
     * Creates a UTF-safe char scanner.
     * @returns A UTF-safe char scanner.
     */
    protected static createUtfSafeCharScanner(): RegExp;
}
