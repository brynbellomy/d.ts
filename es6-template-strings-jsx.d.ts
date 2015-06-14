
/// <reference path="./recast.d.ts" />

declare module 'es6-template-strings-jsx'
{
    import {Node} from 'recast'

    export function transform (node: Node);
    export function transformString (source: string, options: {});
}

