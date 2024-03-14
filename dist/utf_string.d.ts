/** Regular expression for matching surrogate pairs. */
export declare const surrogatePairs: RegExp;
/**
 * Class with UTF-safe string operations.
 */
export declare class UtfString {
    /** The unsafe string for which the object is providing a UTF-safe interface. */
    private readonly unsafeString;
    /** Index signature: implemented via Proxy returned by the constructor. */
    [index: number]: UtfString;
    /**
     * Creates a new UTF-safe string object.
     * @param unsafeString The unsafe string.
     */
    constructor(unsafeString: unknown);
    /**
     * Iterator that enables the usage of for-of loops on instances of this class.
     * @returns An iterator that returns each character in the string separately.
     */
    [Symbol.iterator](): IterableIterator<UtfString>;
    /**
     * Returns the character at the given index from the string.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    charAt(index: number): UtfString;
    /**
     * Returns the Unicode codepoint at the given index.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    charCodeAt(index: number): number;
    /**
     * Returns the Unicode codepoint at the given index.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    codePointAt(index: number): number;
    /**
     * Creates a new UTF-safe string object by concatenating the given strings.
     * @param arr The strings to concatenate.
     * @returns A new UTF-safe string object with the concatenated strings.
     */
    concat(...arr: Array<unknown>): UtfString;
    /**
     * Determines whether the string ends with the characters of a specified search string.
     * @param str The characters to be searched for at the end of the string.
     * @param endPos The end position at which the search string is expected to be found.
     * @returns True if the string ends with the given search string, false otherwise.
     */
    endsWith(str: string | UtfString, endPos?: number): boolean;
    /**
     * Checks if the given string equals the string.
     * @param str The string to compare.
     * @returns True if the strings are equals, false otherwise.
     */
    equals(str: string | UtfString): boolean;
    /**
     * Finds the byte index for the given character index in the string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    findByteIndex(charIndex: number): number;
    /**
     * Finds the character index for the given byte index in the string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    findCharIndex(byteIndex: number): number;
    /**
     * Checks if the search value is within the string.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns True if the search value was found in the string, false otherwise.
     */
    includes(searchValue: string | UtfString, start?: number): boolean;
    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    indexOf(searchValue: string | UtfString, start?: number): number;
    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    lastIndexOf(searchValue: string | UtfString, start?: number): number;
    /**
     * Returns the number of logical characters in the string.
     * @returns The number of logical characters in the string.
     */
    get length(): number;
    /**
     * Matches a string or an object that supports being matched against, and returns an array
     * containing the results of that search, or null if no matches are found.
     * @param matcher An object that supports being matched against.
     */
    match(matcher: string | UtfString | RegExp | {
        [Symbol.match](string: string): RegExpMatchArray | null;
    }): RegExpMatchArray | null;
    /**
     * Creates a new UTF-safe string object by padding the string with a given string (repeated, if needed)
     * so that the resulting string reaches a given length. The padding is applied at the end of the string.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new UTF-safe string object of the specified target length with the padding string applied at the end.
     */
    padEnd(targetLength: number, padString?: string | UtfString): UtfString;
    /**
     * Creates a new UTF-safe string object by padding the string with a given string (repeated, if needed)
     * so that the resulting string reaches a given length. The padding is applied at the start of the string.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new UTF-safe string object of the specified target length
     *          with the padding string applied at the start.
     */
    padStart(targetLength: number, padString?: string | UtfString): UtfString;
    /**
     * Returns a new string which contains the specified number of copies of the string on which it was called.
     * @param count The number of times the string should be repeated.
     * @returns The new string which contains a specified number of copies of the original string.
     */
    repeat(count: number): UtfString;
    /**
     * Creates a new UTF-safe string object with one, some, or all matches of a pattern replaced by a replacement.
     * The pattern can be a string or a RegExp, and the replacement can be a string or a function called for each match.
     * If pattern is a string, only the first occurrence will be replaced.
     * @param pattern The pattern that should be replaced within the string.
     * @param replacement This replaces the strings matched by the pattern.
     * @returns A new UTF-safe string object with the pattern occurrences replaced by the given replacement.
     */
    replace(pattern: string | UtfString | RegExp | {
        [Symbol.replace](string: string, replaceValue: string): string;
    }, replacement: string | UtfString | ((substring: string, ...args: any[]) => string)): UtfString;
    /**
     * Returns the characters between the two given indices in the string.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    slice(start?: number, finish?: number): UtfString;
    /**
     * Splits a string into substrings using the specified separator and return them as an array.
     * @param separator The pattern describing where each split should occur.
     *                  If omitted, a single-element array containing the entire string is returned.
     * @param limit A value used to limit the number of elements returned in the array.
     */
    split(seperator: string | UtfString | RegExp | {
        [Symbol.split](string: string, limit?: number): string[];
    }, limit?: number): UtfString[];
    /**
     * Determines whether the string starts with the characters of a specified search string.
     * @param str The characters to be searched for at the start of the string.
     * @param startPos The start position at which the search string is expected to be found.
     * @returns True if the string starts with the given search string, false otherwise.
     */
    startsWith(str: string | UtfString, startPos?: number): boolean;
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    substr(start?: number, length?: number): UtfString;
    /**
     * Returns the characters starting at the given start index up to the end index.
     * @param start The index from which to start extracting the characters.
     * @param end The index to which characters are extracted.
     * @returns The characters starting at the given start index up to the end index.
     */
    substring(start?: number, end?: number): UtfString;
    /**
     * Converts the string into an array of UTF-16 bytes.
     * @returns The UTF-16 bytes created from the string.
     */
    toBytes(): number[];
    /**
     * Converts the string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @returns The array containing the individual logical characters taken from the string.
     */
    toCharArray(): string[];
    /**
     * Converts the string into an array of codepoints.
     * @returns The codepoints taken from the string.
     */
    toCodePoints(): number[];
    /**
     * Returns a new string in which all the alphabetic characters are converted to lower case,
     * without modifying the original string.
     * @return A new string object in which all alphabetic characters are in lower case.
     */
    toLowerCase(): UtfString;
    /**
     * Returns the unsafe string the object is hiding.
     * @returns The unsafe string.
     */
    toString(): string;
    /**
     * Returns a new string in which all the alphabetic characters are converted to upper case,
     * without modifying the original string.
     * @return A new string object in which all alphabetic characters are in upper case.
     */
    toUpperCase(): UtfString;
    /**
     * Removes whitespace from both ends of the string and returns a new string, without modifying the original string.
     * @returns A new string object without any whitespace at the beginning or the end.
     */
    trim(): UtfString;
    /**
     * Removes whitespace from the end of the string and returns a new string, without modifying the original string.
     * @return A new string object without any whitespace at the end.
     */
    trimEnd(): UtfString;
    /**
     * Removes whitespace from the beginning of the string and returns a new string,
     * without modifying the original string.
     * @return A new string object without any whitespace at the beginning.
     */
    trimLeft(): UtfString;
    /**
     * Removes whitespace from the end of the string and returns a new string, without modifying the original string.
     * @return A new string object without any whitespace at the end.
     */
    trimRight(): UtfString;
    /**
     * Removes whitespace from the beginning of the string and returns a new string,
     * without modifying the original string.
     * @return A new string object without any whitespace at the beginning.
     */
    trimStart(): UtfString;
    /**
     * Returns the constructor function of this object.
     * @returns The constructor function of this object.
     */
    private getClass;
    /**
     * Converts an array of UTF-16 bytes into a string.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The string created from the array of UTF-16 bytes.
     */
    static bytesToString(arr: number[]): string;
    /**
     * Returns the character at the given index from the given string.
     * @param str The string from which to get the character.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    static charAt(str: string, index: number): string;
    /**
     * Returns the Unicode codepoint at the given index from the given string.
     * @param str The string from which to get the Unicode codepoint.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    static charCodeAt(str: string, index: number): number;
    /**
     * Converts an array of codepoints into a string.
     * @param arr The codepoints that should be converted.
     * @returns The string created from the codepoints.
     */
    static codePointsToString(arr: number[]): string;
    /**
     * Finds the byte index for the given character index in the given string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param str The string in which to search the byte index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    static findByteIndex(str: string, charIndex: number): number;
    /**
     * Finds the character index for the given byte index in the given string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param str The string in which to search the character index.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    static findCharIndex(str: string, byteIndex: number): number;
    /**
     * Converts an array of UTF-16 bytes into a UTF-safe string object.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The UTF-safe string object created from the array of UTF-16 bytes.
     */
    static fromBytes(arr: number[]): UtfString;
    /**
     * Returns a UTF-safe string object for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The UTF-safe string object for the given Unicode codepoint.
     */
    static fromCharCode(charCode: number): UtfString;
    /**
     * Converts an array of codepoints into a UTF-safe string object.
     * @param arr The codepoints that should be converted.
     * @returns The UTF-safe string object created from the codepoints.
     */
    static fromCodePoints(arr: number[]): UtfString;
    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    static indexOf(str: string, searchValue: string, start?: number): number;
    /**
     * Concatenates the strings from the given array into a new UTF-safe string object.
     * @param items The array of strings which are joined.
     * @param seperator The seperator string inserted between the concatenated strings.
     * @returns A new string object that contains the concatenated strings from the given array.
     */
    static join(items: ({
        toString(): string;
    } | undefined | null)[], seperator?: UtfString | string): UtfString;
    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    static lastIndexOf(str: string, searchValue: string, start?: number): number;
    /**
     * Returns the number of logical characters in the given string.
     * @param str The string whose length is calculated.
     * @returns The number of logical characters in the given string.
     */
    static lengthOf(str: string): number;
    /**
     * Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string
     * reaches a given length. The padding is applied at the end of the string.
     * @param str The string that should be padded to the target length.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new string of the specified target length with the padding string applied at the end.
     */
    static padEnd(str: string, targetLength: number, padString?: string): string;
    /**
     * Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string
     * reaches a given length. The padding is applied at the start of the string.
     * @param str The string that should be padded to the target length.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new string of the specified target length with the padding string applied at the start.
     */
    static padStart(str: string, targetLength: number, padString?: string): string;
    /**
     * Returns the characters between the two given indices in the given string.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param end The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    static slice(str: string, start?: number, end?: number): string;
    /**
     * Returns the string for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The string for the given Unicode codepoint.
     */
    static stringFromCharCode(charCode: number): string;
    /**
     * Converts a string into an array of UTF-16 bytes.
     * @param str The string that should be converted.
     * @returns The UTF-16 bytes created from the string.
     */
    static stringToBytes(str: string): number[];
    /**
     * Converts the given string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @param str The string that should be converted.
     * @returns The array containing the individual logical characters taken from the string.
     */
    static stringToCharArray(str: string): string[];
    /**
     * Converts a string into an array of codepoints.
     * @param str The string that should be converted.
     * @returns The codepoints taken from the string.
     */
    static stringToCodePoints(str: string): number[];
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    static substr(str: string, start?: number, length?: number): string;
    /**
     * Returns the characters starting at the given start index up to the end index.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param end The index to which characters are extracted.
     * @returns The characters starting at the given start index up to the end index.
     */
    static substring(str: string, start?: number, end?: number): string;
    /**
     * Finds the byte index of a surrogate pair in the given string up until a specific character index.
     * @param str The string in which to search.
     * @param charIndex The character index up until which to search.
     * @returns The byte index of a surrogate pair in the given string.
     *          -1 if no surrogate pair was found.
     */
    private static findSurrogateByteIndex;
    /**
     * Scans a given string up until a specific character index using a regular expression
     * and returns the byte index at which the scan found a match.
     * @param str The string that is scanned.
     * @param scanner The scanner that is used to scan the string.
     * @param charIndex The character index up until which the scan should be performed.
     * @returns The byte index at which the scan found a match.
     *          -1 if the scan did not find a match.
     */
    private static scan;
    /**
     * Checks if the given string contains surrogate pairs.
     * @param str The string that is checked.
     * @returns True if the given string contains surrogate pairs, false otherwise.
     */
    private static containsUnsafeUtfChars;
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
