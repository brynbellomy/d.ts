

declare module "recast"
{
    export = RecastModule;

    module RecastModule
    {
        export function run (fn: (node: Node, callback: (node: Node) => void ) => void);
        export function visit (node: Node, callbacks: {}): void;
        export function parse (source: string): AST;

        export let types: {
            namedTypes: {
                FunctionDeclaration: any;
                BlockStatement: any;
            };
            builders: {
                variableDeclarator: any;
                functionExpression: (name: string, params: string, body: string) => any;
                blockStatement: any;
            };
        };

        export interface Node {}

        export interface AST {
            program: {
                body: any[];
            };
        }

        export interface NamedType {
            assert (node: Node): void;
        }

        export interface VisitHandler {
            (path): void;
        }

        export interface VisitParams {
            visitNode?: VisitHandler;
            visitIfStatement?: VisitHandler;
            visitWhileStatement?: VisitHandler;
            visitForStatement?: VisitHandler;
            visitForInStatement?: VisitHandler;
        }
    }
}

