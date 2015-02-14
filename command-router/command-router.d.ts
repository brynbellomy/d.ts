
declare module "command-router"
{
    import events = require('events')

    class CommandRouter extends events.EventEmitter
    {
        new(options:{});
        command(route:string, description:string, callback) :CommandRouter;
        command(route:string, callback) :CommandRouter;
        parse(argv:string[]) :void;
        dispatch(path:string) :void;
        option(name:string, opts:{}) :CommandRouter;
        helpText() :string;
    }

    export = CommandRouter;
}

