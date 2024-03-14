"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtfString = exports.surrogatePairs = void 0;
const utils_1 = require("./utils");
/** Regular expression for matching surrogate pairs. */
exports.surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
function createSurrogatePairScanner() {
    return new RegExp(exports.surrogatePairs.source, "g");
}
/**
 * Creates a regular expression that matches every character of a string and is UTF-safe.
 * @returns The regular expression for matching every character of a string.
 */
function createUtfSafeCharScannerHandlingSurrogatePairs() {
    const sources = new Array();
    sources.push(exports.surrogatePairs.source);
    sources.push("[^]");
    return new RegExp(sources.join("|"), "g");
}
/**
 * Class with UTF-safe string operations.
 */
class UtfString {
    /**
     * Creates a new UTF-safe string object.
     * @param unsafeString The unsafe string.
     */
    constructor(unsafeString) {
        if (!(0, utils_1.isDefined)(unsafeString)) {
            this.unsafeString = "";
        }
        else if (unsafeString instanceof UtfString) {
            this.unsafeString = unsafeString.toString();
        }
        else {
            this.unsafeString = String(unsafeString);
        }
        return new Proxy(this, {
            get: (obj, key) => {
                return typeof key === "string" && Number.isInteger(Number(key))
                    ? obj.charAt(parseInt(key, 0))
                    : obj[key];
            },
        });
    }
    /**
     * Iterator that enables the usage of for-of loops on instances of this class.
     * @returns An iterator that returns each character in the string separately.
     */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; ++i) {
            yield this.charAt(i);
        }
    }
    /**
     * Returns the character at the given index from the string.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    charAt(index) {
        const ctor = this.getClass();
        const char = ctor.charAt(this.unsafeString, index);
        return new ctor(char);
    }
    /**
     * Returns the Unicode codepoint at the given index.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    charCodeAt(index) {
        return this.getClass().charCodeAt(this.unsafeString, index);
    }
    /**
     * Returns the Unicode codepoint at the given index.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    codePointAt(index) {
        return this.getClass().charCodeAt(this.unsafeString, index);
    }
    /**
     * Creates a new UTF-safe string object by concatenating the given strings.
     * @param arr The strings to concatenate.
     * @returns A new UTF-safe string object with the concatenated strings.
     */
    concat(...arr) {
        const ctor = this.getClass();
        return new ctor(this.unsafeString + arr.map((x) => String(x)).join(""));
    }
    /**
     * Determines whether the string ends with the characters of a specified search string.
     * @param str The characters to be searched for at the end of the string.
     * @param endPos The end position at which the search string is expected to be found.
     * @returns True if the string ends with the given search string, false otherwise.
     */
    endsWith(str, endPos) {
        return this.unsafeString.endsWith(str.toString(), endPos);
    }
    /**
     * Checks if the given string equals the string.
     * @param str The string to compare.
     * @returns True if the strings are equals, false otherwise.
     */
    equals(str) {
        return this.unsafeString === (str === null || str === void 0 ? void 0 : str.toString());
    }
    /**
     * Finds the byte index for the given character index in the string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    findByteIndex(charIndex) {
        return this.getClass().findByteIndex(this.unsafeString, charIndex);
    }
    /**
     * Finds the character index for the given byte index in the string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    findCharIndex(byteIndex) {
        return this.getClass().findCharIndex(this.unsafeString, byteIndex);
    }
    /**
     * Checks if the search value is within the string.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns True if the search value was found in the string, false otherwise.
     */
    includes(searchValue, start = 0) {
        return this.indexOf(searchValue, start) !== -1;
    }
    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    indexOf(searchValue, start = 0) {
        return this.getClass().indexOf(this.unsafeString, searchValue.toString(), start);
    }
    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    lastIndexOf(searchValue, start) {
        return this.getClass().lastIndexOf(this.unsafeString, searchValue.toString(), start);
    }
    /**
     * Returns the number of logical characters in the string.
     * @returns The number of logical characters in the string.
     */
    get length() {
        return this.getClass().lengthOf(this.unsafeString);
    }
    match(matcher) {
        return this.toString().match(matcher instanceof UtfString ? matcher.toString() : matcher);
    }
    /**
     * Creates a new UTF-safe string object by padding the string with a given string (repeated, if needed)
     * so that the resulting string reaches a given length. The padding is applied at the end of the string.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new UTF-safe string object of the specified target length with the padding string applied at the end.
     */
    padEnd(targetLength, padString) {
        const ctor = this.getClass();
        return new ctor(ctor.padEnd(this.unsafeString, targetLength, padString === null || padString === void 0 ? void 0 : padString.toString()));
    }
    /**
     * Creates a new UTF-safe string object by padding the string with a given string (repeated, if needed)
     * so that the resulting string reaches a given length. The padding is applied at the start of the string.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new UTF-safe string object of the specified target length
     *          with the padding string applied at the start.
     */
    padStart(targetLength, padString) {
        const ctor = this.getClass();
        return new ctor(ctor.padStart(this.unsafeString, targetLength, padString === null || padString === void 0 ? void 0 : padString.toString()));
    }
    /**
     * Returns a new string which contains the specified number of copies of the string on which it was called.
     * @param count The number of times the string should be repeated.
     * @returns The new string which contains a specified number of copies of the original string.
     */
    repeat(count) {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.repeat(count));
    }
    replace(pattern, replacement) {
        if (pattern instanceof UtfString) {
            pattern = pattern.toString();
        }
        if (replacement instanceof UtfString) {
            replacement = replacement.toString();
        }
        const ctor = this.getClass();
        return new ctor(this.unsafeString.replace(pattern, replacement));
    }
    /**
     * Returns the characters between the two given indices in the string.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    slice(start, finish) {
        const ctor = this.getClass();
        const str = ctor.slice(this.unsafeString, start, finish);
        return new ctor(str);
    }
    split(seperator, limit) {
        if (seperator === "") {
            return [...this].slice(0, limit);
        }
        const ctor = this.getClass();
        return this.unsafeString.split(seperator, limit).map((str) => new ctor(str));
    }
    /**
     * Determines whether the string starts with the characters of a specified search string.
     * @param str The characters to be searched for at the start of the string.
     * @param startPos The start position at which the search string is expected to be found.
     * @returns True if the string starts with the given search string, false otherwise.
     */
    startsWith(str, startPos) {
        return this.unsafeString.startsWith(str.toString(), startPos);
    }
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    substr(start, length) {
        const ctor = this.getClass();
        const str = ctor.substr(this.unsafeString, start, length);
        return new ctor(str);
    }
    /**
     * Returns the characters starting at the given start index up to the end index.
     * @param start The index from which to start extracting the characters.
     * @param end The index to which characters are extracted.
     * @returns The characters starting at the given start index up to the end index.
     */
    substring(start, end) {
        const ctor = this.getClass();
        const str = ctor.substring(this.unsafeString, start, end);
        return new ctor(str);
    }
    /**
     * Converts the string into an array of UTF-16 bytes.
     * @returns The UTF-16 bytes created from the string.
     */
    toBytes() {
        return this.getClass().stringToBytes(this.unsafeString);
    }
    /**
     * Converts the string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @returns The array containing the individual logical characters taken from the string.
     */
    toCharArray() {
        return this.getClass().stringToCharArray(this.unsafeString);
    }
    /**
     * Converts the string into an array of codepoints.
     * @returns The codepoints taken from the string.
     */
    toCodePoints() {
        return this.getClass().stringToCodePoints(this.unsafeString);
    }
    /**
     * Returns a new string in which all the alphabetic characters are converted to lower case,
     * without modifying the original string.
     * @return A new string object in which all alphabetic characters are in lower case.
     */
    toLowerCase() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.toLowerCase());
    }
    /**
     * Returns the unsafe string the object is hiding.
     * @returns The unsafe string.
     */
    toString() {
        return this.unsafeString;
    }
    /**
     * Returns a new string in which all the alphabetic characters are converted to upper case,
     * without modifying the original string.
     * @return A new string object in which all alphabetic characters are in upper case.
     */
    toUpperCase() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.toUpperCase());
    }
    /**
     * Removes whitespace from both ends of the string and returns a new string, without modifying the original string.
     * @returns A new string object without any whitespace at the beginning or the end.
     */
    trim() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trim());
    }
    /**
     * Removes whitespace from the end of the string and returns a new string, without modifying the original string.
     * @return A new string object without any whitespace at the end.
     */
    trimEnd() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimEnd());
    }
    /**
     * Removes whitespace from the beginning of the string and returns a new string,
     * without modifying the original string.
     * @return A new string object without any whitespace at the beginning.
     */
    trimLeft() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimLeft());
    }
    /**
     * Removes whitespace from the end of the string and returns a new string, without modifying the original string.
     * @return A new string object without any whitespace at the end.
     */
    trimRight() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimRight());
    }
    /**
     * Removes whitespace from the beginning of the string and returns a new string,
     * without modifying the original string.
     * @return A new string object without any whitespace at the beginning.
     */
    trimStart() {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimStart());
    }
    /**
     * Returns the constructor function of this object.
     * @returns The constructor function of this object.
     */
    getClass() {
        // gets the constructor function at runtime and therefore also works in derived classes
        return Object.getPrototypeOf(this).constructor;
    }
    /**
     * Converts an array of UTF-16 bytes into a string.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The string created from the array of UTF-16 bytes.
     */
    static bytesToString(arr) {
        const result = new Array();
        for (let i = 0; i < arr.length; i += 2) {
            const hi = arr[i];
            const low = arr[i + 1];
            const combined = (hi << 8) | low;
            result.push(String.fromCharCode(combined));
        }
        return result.join("");
    }
    /**
     * Returns the character at the given index from the given string.
     * @param str The string from which to get the character.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    static charAt(str, index) {
        const byteIndex = this.findByteIndex(str, index);
        if (byteIndex < 0) {
            return "";
        }
        const characters = str.slice(byteIndex, byteIndex + 8);
        const scanner = this.createUtfSafeCharScanner();
        const match = scanner.exec(characters);
        return match === null ? characters[0] : match[0];
    }
    /**
     * Returns the Unicode codepoint at the given index from the given string.
     * @param str The string from which to get the Unicode codepoint.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    static charCodeAt(str, index) {
        const byteIndex = this.findSurrogateByteIndex(str, index);
        if (byteIndex < 0) {
            return NaN;
        }
        const code = str.charCodeAt(byteIndex);
        if (0xd800 <= code && code <= 0xdbff) {
            const hi = code;
            const low = str.charCodeAt(byteIndex + 1);
            return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
        }
        return code;
    }
    /**
     * Converts an array of codepoints into a string.
     * @param arr The codepoints that should be converted.
     * @returns The string created from the codepoints.
     */
    static codePointsToString(arr) {
        const chars = arr.map((a) => this.stringFromCharCode(a));
        return chars.join("");
    }
    /**
     * Finds the byte index for the given character index in the given string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param str The string in which to search the byte index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    static findByteIndex(str, charIndex) {
        if (charIndex >= this.lengthOf(str)) {
            return -1;
        }
        return this.scan(str, this.createUtfSafeCharScanner(), charIndex);
    }
    /**
     * Finds the character index for the given byte index in the given string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param str The string in which to search the character index.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    static findCharIndex(str, byteIndex) {
        if (byteIndex >= str.length) {
            return -1;
        }
        // optimization: don't iterate unless necessary
        if (!this.containsUnsafeUtfChars(str)) {
            return byteIndex;
        }
        const scanner = this.createUtfSafeCharScanner();
        let charCount = 0;
        while (scanner.exec(str) !== null) {
            if (scanner.lastIndex > byteIndex) {
                break;
            }
            charCount++;
        }
        return charCount;
    }
    /**
     * Converts an array of UTF-16 bytes into a UTF-safe string object.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The UTF-safe string object created from the array of UTF-16 bytes.
     */
    static fromBytes(arr) {
        return new this(this.bytesToString(arr));
    }
    /**
     * Returns a UTF-safe string object for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The UTF-safe string object for the given Unicode codepoint.
     */
    static fromCharCode(charCode) {
        return new this(this.stringFromCharCode(charCode));
    }
    /**
     * Converts an array of codepoints into a UTF-safe string object.
     * @param arr The codepoints that should be converted.
     * @returns The UTF-safe string object created from the codepoints.
     */
    static fromCodePoints(arr) {
        return new this(this.codePointsToString(arr));
    }
    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    static indexOf(str, searchValue, start = 0) {
        const startByteIndex = this.findByteIndex(str, start);
        if (startByteIndex < 0) {
            return -1;
        }
        const index = str.indexOf(searchValue, startByteIndex);
        return index < 0 ? -1 : this.findCharIndex(str, index);
    }
    /**
     * Concatenates the strings from the given array into a new UTF-safe string object.
     * @param items The array of strings which are joined.
     * @param seperator The seperator string inserted between the concatenated strings.
     * @returns A new string object that contains the concatenated strings from the given array.
     */
    static join(items, seperator = ",") {
        const text = items.map((x) => ((0, utils_1.isDefined)(x) ? x.toString() : "")).join(seperator.toString());
        return new this(text);
    }
    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    static lastIndexOf(str, searchValue, start) {
        let index;
        if (!(0, utils_1.isDefined)(start)) {
            index = str.lastIndexOf(searchValue);
        }
        else {
            const startByteIndex = this.findByteIndex(str, start);
            if (startByteIndex < 0) {
                return -1;
            }
            index = str.lastIndexOf(searchValue, startByteIndex);
        }
        return index < 0 ? -1 : this.findCharIndex(str, index);
    }
    /**
     * Returns the number of logical characters in the given string.
     * @param str The string whose length is calculated.
     * @returns The number of logical characters in the given string.
     */
    static lengthOf(str) {
        // findCharIndex will return -1 if string is empty, so add 1
        return this.findCharIndex(str, str.length - 1) + 1;
    }
    /**
     * Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string
     * reaches a given length. The padding is applied at the end of the string.
     * @param str The string that should be padded to the target length.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new string of the specified target length with the padding string applied at the end.
     */
    static padEnd(str, targetLength, padString = " ") {
        if (targetLength <= this.lengthOf(str)) {
            return str;
        }
        let iPadStr = 0;
        let newStr = str;
        do {
            newStr += this.charAt(padString, iPadStr);
            ++iPadStr;
            if (iPadStr >= this.lengthOf(padString)) {
                iPadStr = 0;
            }
        } while (this.lengthOf(newStr) < targetLength);
        return newStr;
    }
    /**
     * Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string
     * reaches a given length. The padding is applied at the start of the string.
     * @param str The string that should be padded to the target length.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new string of the specified target length with the padding string applied at the start.
     */
    static padStart(str, targetLength, padString = " ") {
        if (targetLength <= this.lengthOf(str)) {
            return str;
        }
        let iPadStr = 0;
        let fullPadding = "";
        do {
            fullPadding += this.charAt(padString, iPadStr);
            ++iPadStr;
            if (iPadStr >= this.lengthOf(padString)) {
                iPadStr = 0;
            }
        } while (this.lengthOf(fullPadding + str) < targetLength);
        return fullPadding + str;
    }
    /**
     * Returns the characters between the two given indices in the given string.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param end The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    static slice(str, start, end) {
        if (!(0, utils_1.isNumber)(start)) {
            start = 0;
        }
        else if (start < 0) {
            start = this.lengthOf(str) + start;
        }
        if (!(0, utils_1.isNumber)(end) || end >= this.lengthOf(str)) {
            end = str.length;
        }
        else if (end < 0) {
            end = this.lengthOf(str) + end;
        }
        let startByteIndex = this.findByteIndex(str, start);
        if (startByteIndex < 0) {
            startByteIndex = str.length;
        }
        let finishByteIndex = this.findByteIndex(str, end);
        if (finishByteIndex < 0) {
            finishByteIndex = str.length;
        }
        return str.slice(startByteIndex, finishByteIndex);
    }
    /**
     * Returns the string for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The string for the given Unicode codepoint.
     */
    static stringFromCharCode(charCode) {
        if (charCode > 0xffff) {
            charCode -= 0x10000;
            return String.fromCharCode(0xd800 + (charCode >> 10), 0xdc00 + (charCode & 0x3ff));
        }
        else {
            return String.fromCharCode(charCode);
        }
    }
    /**
     * Converts a string into an array of UTF-16 bytes.
     * @param str The string that should be converted.
     * @returns The UTF-16 bytes created from the string.
     */
    static stringToBytes(str) {
        let result = new Array();
        for (let i = 0; i < str.length; i++) {
            let chr = str.charCodeAt(i);
            const byteArray = new Array();
            while (chr > 0) {
                byteArray.push(chr & 0xff);
                chr >>= 8;
            }
            // all utf-16 characters are two bytes
            if (byteArray.length === 1) {
                byteArray.push(0);
            }
            // assume big-endian
            result = result.concat(byteArray.reverse());
        }
        return result;
    }
    /**
     * Converts the given string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @param str The string that should be converted.
     * @returns The array containing the individual logical characters taken from the string.
     */
    static stringToCharArray(str) {
        const result = new Array();
        const scanner = this.createUtfSafeCharScanner();
        let match;
        do {
            match = scanner.exec(str);
            if (match === null) {
                break;
            }
            result.push(match[0]);
        } while (match !== null);
        return result;
    }
    /**
     * Converts a string into an array of codepoints.
     * @param str The string that should be converted.
     * @returns The codepoints taken from the string.
     */
    static stringToCodePoints(str) {
        const result = new Array();
        for (let i = 0; i < str.length; i++) {
            const codePoint = this.charCodeAt(str, i);
            if (!codePoint) {
                break;
            }
            result.push(codePoint);
        }
        return result;
    }
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    static substr(str, start, length) {
        if (!(0, utils_1.isNumber)(start)) {
            start = 0;
        }
        if ((0, utils_1.isDefined)(length)) {
            if (isNaN(length)) {
                length = 0;
            }
            if (length <= 0) {
                return "";
            }
        }
        if (start < 0) {
            start = Math.max(this.lengthOf(str) + start, 0);
        }
        if (!(0, utils_1.isDefined)(length)) {
            return this.slice(str, start);
        }
        else {
            return this.slice(str, start, start + length);
        }
    }
    /**
     * Returns the characters starting at the given start index up to the end index.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param end The index to which characters are extracted.
     * @returns The characters starting at the given start index up to the end index.
     */
    static substring(str, start, end) {
        if (!(0, utils_1.isNumber)(start) || start < 0) {
            start = 0;
        }
        if (!(0, utils_1.isDefined)(end)) {
            end = this.lengthOf(str);
        }
        else if (isNaN(end)) {
            end = 0;
        }
        else if (end < 0) {
            end = 0;
        }
        if (start > end) {
            [start, end] = [end, start];
        }
        return this.slice(str, start, end);
    }
    /**
     * Finds the byte index of a surrogate pair in the given string up until a specific character index.
     * @param str The string in which to search.
     * @param charIndex The character index up until which to search.
     * @returns The byte index of a surrogate pair in the given string.
     *          -1 if no surrogate pair was found.
     */
    static findSurrogateByteIndex(str, charIndex) {
        return this.scan(str, createSurrogatePairScanner(), charIndex);
    }
    /**
     * Scans a given string up until a specific character index using a regular expression
     * and returns the byte index at which the scan found a match.
     * @param str The string that is scanned.
     * @param scanner The scanner that is used to scan the string.
     * @param charIndex The character index up until which the scan should be performed.
     * @returns The byte index at which the scan found a match.
     *          -1 if the scan did not find a match.
     */
    static scan(str, scanner, charIndex) {
        // optimization: don't iterate unless it's necessary
        if (!this.containsUnsafeUtfChars(str)) {
            return charIndex;
        }
        let byteIndex = 0;
        let curCharIndex = 0;
        while (true) {
            const match = scanner.exec(str);
            const nextIdx = match ? match.index : str.length;
            while (curCharIndex < charIndex) {
                if (byteIndex === nextIdx) {
                    if (curCharIndex < charIndex) {
                        curCharIndex++;
                        if (match) {
                            byteIndex += match[0].length;
                        }
                        else {
                            byteIndex++;
                        }
                    }
                    break;
                }
                byteIndex++;
                curCharIndex++;
            }
            if (curCharIndex === charIndex) {
                break;
            }
            else if (byteIndex >= str.length || !match) {
                return -1;
            }
        }
        return byteIndex;
    }
    /**
     * Checks if the given string contains surrogate pairs.
     * @param str The string that is checked.
     * @returns True if the given string contains surrogate pairs, false otherwise.
     */
    static containsUnsafeUtfChars(str) {
        const scanner = this.createUnsafeUtfCharFinder();
        return scanner.test(str);
    }
    /**
     * Creates a char scanner that matches unsafe UTF chars.
     * @returns A char scanner that matches unsafe UTF chars.
     */
    static createUnsafeUtfCharFinder() {
        return createSurrogatePairScanner();
    }
    /**
     * Creates a UTF-safe char scanner.
     * @returns A UTF-safe char scanner.
     */
    static createUtfSafeCharScanner() {
        return createUtfSafeCharScannerHandlingSurrogatePairs();
    }
}
exports.UtfString = UtfString;
