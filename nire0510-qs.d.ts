// Type definitions for Qs v0.3.8
// Project: https://github.com/nire0510/qs
// Definitions by: bryn austin bellomy <https://github.com/brynbellomy>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare function QS(strUrl:string): QueryString;

interface QueryString {
    /** Current library version */
    version: string;
    /** Url to parse */
    url: string;
    /** Query string tokens object */
    tokens: {};

    /** Checks if url contains specific query string token's key. */
    has (key:string): boolean;
    /** Gets query string token's decoded value. */
    get (key:string): any;
    /** Gets all query string tokens object. */
    getAll(): {};
    /** Sets (update or insert) a query string token and then updates URL property. */
    set (strKey:string, objValue:any): QueryString;
    /** Removes a query string token from URL. */
    remove (strKey:string): QueryString;

    /** Changes browser location to QS url (usually after manipulating query string tokens). */
    go(): void;

    /** Logs all query string tokens to browser's console. */
    log(): void;
}

