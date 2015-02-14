
// type Asdf = Array<StringOrNumber>;

declare module "js-vim-command"
{

    type StringOrNumber = string|number;
    class Parser
    {
        new();
        parse (input:string) :IParserResult;
    }

    interface IParserResult {
        description: string;
        value:       StringOrNumber[];
    }

    export = Parser;
}



