

declare module 'inquirer'
{
    module Inquirer
    {
        export function prompt(questions:Array<{}>, callback:(any) => void) :void;
    }

    export = Inquirer
}