// Generated by dts-bundle v0.2.0
// Dependencies for this module:
//   typings/react/react.d.ts

///<reference path='../react/react-global.d.ts' />

declare module 'typed-react' {
    export import Component = require("typed-react/component");
    export import createClass = require("typed-react/create_class");
    export import createMixin = require("typed-react/create_mixin");
    export import extractPrototype = require("typed-react/extract_prototype");
    export import Mixin = require("typed-react/mixin");
    export import NotImplementedError = require("typed-react/not_implemented_error");
}

declare module 'typed-react/component' {
    import Mixin = require("typed-react/mixin");
    class Component<P, S> extends Mixin<P, S> implements React.ClassicComponent<P, S> {
        render(): React.ReactElement<any>;
    }
    export = Component;
}

declare module 'typed-react/create_class' {
    import Component = require("typed-react/component");
    function createClass<P, S>(clazz: {
        new (): Component<P, S>;
    }, mixins?: React.Mixin<P, S>[]): React.ComponentClass<P>;
    export = createClass;
}

declare module 'typed-react/create_mixin' {
    import Mixin = require("typed-react/mixin");
    function createMixin<P, S>(clazz: {
        new (): Mixin<P, S>;
    }): React.Mixin<P, S>;
    export = createMixin;
}

declare module 'typed-react/extract_prototype' {
    function extractPrototype<T>(clazz: {
        new (): T;
    }): T;
    export = extractPrototype;
}

declare module 'typed-react/mixin' {
    class Mixin<P, S> implements React.Mixin<P, S> {
        refs: {
            [key: string]: React.Component<any, any>;
        };
        props: P;
        state: S;
        context: any;
        getDOMNode(): Element;
        setState(nextState: S | ((prevState: S, props: P) => S), callback?: () => void): void;
        replaceState(nextState: S, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        isMounted(): boolean;
        setProps(nextProps: P, callback?: () => void): void;
        replaceProps(nextProps: P, callback?: () => void): void;
    }
    export = Mixin;
}

declare module 'typed-react/not_implemented_error' {
    class NotImplementedError implements Error {
        name: string;
        message: string;
        constructor(methodName: string);
    }
    export = NotImplementedError;
}

