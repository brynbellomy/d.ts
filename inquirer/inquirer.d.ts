

declare module 'inquirer'
{
    module Inquirer {
        export function prompt(questions:Array<{}>, callback:(...args:any[]) => void) :void;
    }

    export = Inquirer
}