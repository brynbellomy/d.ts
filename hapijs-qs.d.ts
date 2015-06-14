// Type definitions for Qs v3.1.0
// Project: https://github.com/hapijs/qs
// Definitions by: bryn austin bellomy <https://github.com/brynbellomy>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module 'qs' {
    export function stringify (queryObj: {}, options?: StringifyOptions): string;
    export function parse (queryObj: {}, options?: ParseOptions): string;
}


interface StringifyOptions {
    filter: (prefix:string, obj:{}) => {} | string[];

    /** Format of the output array.  Can be 'indices', 'brackets', or 'repeat'. */
    arrayFormat?: string;
    /** Specifies the character to use in between `key=value` pairs.  For example, `";"` would result in `a=123;b=foobar;c=...`, etc. */
    delimiter?: string;
    /** If `false`, stringified arrays are not given explicit indices.  For example, stringifying `{ arr: [2, 4, 'zebra'] }` would yield "arr=2&arr=4&arr=zebra".  If `true`, the result would instead be "arr[0]=2&arr[1]=4&arr[2]=zebra". */
    indices?: boolean;
    strictNullHandling: boolean;
}

interface ParseOptions {
    delimiter: string;
    depth: number;
    arrayLimit: number;
    parseArrays:boolean;
    allowDots:boolean;
    parameterLimit: number;
    strictNullHandling: boolean;
}
