
declare module "blessed"
{
    import events = require('events');

    module Blessed
    {
        export function Screen (options?:IScreenOptions) :IScreen;
        export function Box (options?:IBoxOptions) :IBox;
        export function Node (options?:INodeOptions) :INode;
        export function Line (options?:ILineOptions) :ILine;
        export function Element (options?:IElementOptions) :IElement;
        export function Form (options?:IFormOptions) :IForm;
        export function List (options?:IListOptions) :IList;
        export function FileManager (options?:IFileManagerOptions) :IFileManager;
        export function Terminal (options?:ITerminalOptions) :ITerminal;

        export var colors :IColors;

        export interface IColorPair {
            /** background, must be number (-1 for default). */
            bg?: number;
            /** foreground, must be number (-1 for default). */
            fg?: number;
        }

        export interface IStyle extends IColorPair {
            bold?: boolean;
            underline?: boolean;
            border: IBorder;
            hover: IColorPair;
        }

        export interface IBorder extends IColorPair {
            /** type of border ('line' or 'bg'). */
            type?: string; //'line'|'bg';
            /** character to use if bg type, default is space. */
            ch?: string;
        }

        export interface IPadding {
            top?:number;
            right?:number;
            bottom?:number;
            left?:number;
        }

        export interface IPosition {
            /** offsets of the element relative to its parent. can be a number, percentage (0-100%), or keyword (center). right and bottom do not accept keywords. */
            top?:number|string;
            /** offsets of the element relative to its parent. can be a number, percentage (0-100%), or keyword (center). right and bottom do not accept keywords. */
            right?:number|string;
            /** offsets of the element relative to its parent. can be a number, percentage (0-100%), or keyword (center). right and bottom do not accept keywords. */
            bottom?:number|string;
            /** offsets of the element relative to its parent. can be a number, percentage (0-100%), or keyword (center). right and bottom do not accept keywords. */
            left?:number|string;
            /** width of the element, can be a number, percentage (0-100%), or keyword (half or shrink). */
            width?:number|string;
            /** height of the element, can be a number, percentage (0-100%), or keyword (half or shrink). */
            height?:number|string;
        }

        export interface IKeyCode {
            name: string;
            ctrl: boolean;
            meta: boolean;
            shift: boolean;
            sequence: string;
            full: string;
        }

        export interface IProgram
        {
            /**
                Wrap the given text in terminal formatting codes corresponding to the given attribute
                name. The `attr` string can be of the form `red fg` or `52 bg` where `52` is a 0-255
                integer color number.
            */
            text (text:string, attr:string) :string;
        }

        export interface IColors {
            /** Either pass a hex string, an array of 3 numbers, or three separate numbers representing an RGB value.  This returns the 0-255 color number for that color. */
            match (r:string|number[]|number, g?:number, b?:number) :number;

            /** An array of the 255 colors as hex strings. */
            colors: string[];
        }

        export interface INodeOptions
        {
            screen?: IScreen;
            parent?: INode;
            children?: INode[];
        }

        export interface INode extends events.EventEmitter
        {
            type        :string;
            options     :INodeOptions;
            parent      :INode;
            screen      :IScreen;
            children    :INode[];
            data        :any;
            _           :any;
            $           :any;
            index       :number;

            // on(event:string, callback:() => void);
            // on(event:'adopt', callback:() => void);
            // on(event:'remove', callback:() => void);
            // on(event:'reparent', callback:() => void);
            // on(event:'attach', callback:() => void);
            // on(event:'detach', callback:() => void);

            prepend(node:INode) :void;
            append(node:INode) :void;
            remove(node:INode) :void;
            insert(node:INode, index:number) :void;
            insertBefore(node:INode, refNode:INode) :void;
            insertAfter(node:INode, refNode:INode) :void;
            detach() :void;
            // emitDescendants() :void;
            // get(key:string) :any;
            // get(key:string, default:any) :any;
            // set(key:string, value:any) :void;
        }

        export interface IScreenOptions extends INodeOptions
        {
            /** the blessed Program to be associated with. */
            program?: any;
            /** attempt to perform CSR optimization on all possible elements (not just full-width ones, elements with uniform cells to their sides). this is known to cause flickering with elements that are not full-width, however, it is more optimal for terminal rendering. */
            smartCSR?: boolean;
            /** do CSR on any element within 20 cols of the screen edge on either side. faster than smartCSR, but may cause flickering depending on what is on each side of the element. */
            fastCSR?: boolean;
            /** attempt to perform back_color_erase optimizations for terminals that support it. it will also work with terminals that don't support it, but only on lines with the default background color. as it stands with the current implementation, it's uncertain how much terminal performance this adds at the cost of overhead within node. */
            useBCE?: boolean;
            /** amount of time (in ms) to redraw the screen after the terminal is resized (default: 300). */
            resizeTimeout?: number;
            /** the width of tabs within an element's content. */
            tabSize?: number;
            /** automatically position child elements with border and padding in mind. */
            autoPadding?: boolean;
            /** the name of the logfile to use.  if specified but the file does not exist, it will be created. see log method. */
            log?: string;
            /** dump all output and input to desired file. can be used together with log option if set as a boolean. */
            dump?: any;
            /** debug mode. enables usage of the debug method. */
            debug?: boolean;
            /** Array of keys in their full format (e.g. C-c) to ignore when keys are locked. Useful for creating a key that will always exit no matter whether the keys are locked. */
            ignoreLocked?: string[];
        }


        export interface IScreen extends INode
        {
            /** the blessed Program object. */
            program: any;
            /** the blessed Tput object (only available if you passed tput: true to the Program constructor.) */
            tput: any;
            /** top of the focus history stack. */
            focused: any;
            /** width of the screen (same as program.cols). */
            width: number;
            /** height of the screen (same as program.rows). */
            height: number;
            /** same as screen.width. */
            cols: number;
            /** same as screen.height. */
            rows: number;
            /** left offset, always zero. */
            left: number;
            /** left offset, always zero. */
            rleft: number;
            /** right offset, always zero. */
            right: number;
            /** right offset, always zero. */
            rright: number;
            /** top offset, always zero. */
            top: number;
            /** top offset, always zero. */
            rtop: number;
            /** bottom offset, always zero. */
            bottom: number;
            /** bottom offset, always zero. */
            rbottom: number;
            /** whether the focused element grabs all keypresses. */
            grabKeys: boolean;
            /** prevent keypresses from being received by any element. */
            lockKeys: boolean;
            /** the currently hovered element. only set if mouse events are bound. */
            hover: IElement;
            /** set or get window title. */
            title: string;

            /** write string to the log file if one was created. */
            log(...msg:any[]): void;
            /** same as the log method, but only gets called if the debug option was set. */
            debug(...msg:string[]): void;
            /** allocate a new pending screen buffer and a new output screen buffer. */
            alloc(): void;
            /** draw the screen based on the contents of the screen buffer. */
            draw(start, end): void;
            /** render all child elements, writing all data to the screen buffer and drawing the screen. */
            render(): void;
            /** clear any region on the screen. */
            clearRegion(x1, x2, y1, y2): void;
            /** fill any region with a character of a certain attribute. */
            fillRegion(attr, ch, x1, x2, y1, y2): void;
            /** focus element by offset of focusable elements. */
            focusOffset(offset): void;
            /** focus previous element in the index. */
            focusPrevious(): void;
            /** focus next element in the index. */
            focusNext(): void;
            /** push element on the focus stack (equivalent to screen.focused = el). */
            focusPush(element): void;
            /** pop element off the focus stack. */
            focusPop(): void;
            /** save the focused element. */
            saveFocus(): void;
            /** restore the saved focused element. */
            restoreFocus(): void;
            /** "rewind" focus to the last visible and attached element. */
            rewindFocus(): void;
            /** bind a keypress listener for a specific key. */
            key(keyEvents:string|string[], callback:(character:string, keyCode:IKeyCode) => void) :void;
            /** bind a keypress listener for a specific key once. */
            onceKey(keyEvents:string|string[], callback:(character:string, keyCode:IKeyCode) => void) :void;
            /** remove a keypress listener for a specific key. */
            unkey(name:string, listener): void;
            /** spawn a process in the foreground, return to blessed app after exit. */
            spawn(file:string, args, options): void;
            /** spawn a process in the foreground, return to blessed app after exit. executes callback on error or exit. */
            exec(file:string, args, options, callback): void;
            /** read data from text editor. */
            readEditor(options:{}, callback): void;
            /** set effects based on two events and attributes. */
            setEffects(el, fel, over, out, effects, temp): void;
            /** insert a line into the screen (using csr: this bypasses the output buffer). */
            insertLine(n, y, top, bottom): void;
            /** delete a line from the screen (using csr: this bypasses the output buffer). */
            deleteLine(n, y, top, bottom): void;
            /** insert a line at the bottom of the screen. */
            insertBottom(top, bottom): void;
            /** insert a line at the top of the screen. */
            insertTop(top, bottom): void;
            /** delete a line at the bottom of the screen. */
            deleteBottom(top, bottom): void;
            /** delete a line at the top of the screen. */
            deleteTop(top, bottom): void;
        }

        export interface IElementOptions extends INodeOptions
        {
            fg?: string;
            bg?: string;
            scrollbar?: IColorPair;
            focus?: IStyle;
            hover?: IStyle;

            /** border object, see below. */
            border?: IBorder;
            /** positioning options. */
            position?: IPosition;
            /** amount of padding on the inside of the element. can be a number or an object containing the properties: left, right, top, and bottom. */
            padding?: number|IPadding;
            /** element's text content. */
            content?: string;
            /** element is clickable. */
            clickable?: boolean;
            /** element is focusable and can receive key input. */
            input?: boolean;
            /** element is focused. */
            focused?: boolean;
            /** whether the element is hidden. */
            hidden?: boolean;
            /** a simple text label for the element. */
            label?: string;
            /** a floating text label for the element which appears on mouseover. */
            hoverText?: string;
            /** text alignment: left, center, or right. */
            align?: string;
            /** vertical text alignment: top, middle, or bottom. */
            valign?: string;
            /** shrink/flex/grow to content and child elements. width/height during render. */
            shrink?: any;
            /** width of the element, can be a number, percentage (0-100%), or keyword (half or shrink). */
            width?: number|string;
            /** height of the element, can be a number, percentage (0-100%), or keyword (half or shrink). */
            height?: number|string;
            /** whether the element is scrollable or not. */
            scrollable?: boolean;
            /** background character (default is whitespace ). */
            ch?: string;
        }

        export interface IElement extends INode
        {
            /** name of the element. useful for form submission. */
            name: string;
            /** border object. */
            border: IBorder;
            /** contains attributes (e.g. fg/bg/underline). see above. */
            style: IStyle;
            /** raw width, height, and offsets. */
            position: IPosition;
            /** type of border (line or bg). bg by default. */
            type: string; //'line'|'bg';
            /** character to use if bg type, default is space. */
            ch: string;
            /** raw text content. */
            content: string;
            /** whether the element is hidden or not. */
            hidden: boolean;
            /** whether the element is visible or not. */
            visible: boolean;
            /** whether the element is attached to a screen in its ancestry somewhere. */
            detached: boolean;
            /** calculated width. */
            width: number;
            /** calculated height. */
            height: number;
            /** calculated absolute left offset. */
            left: number;
            /** calculated absolute right offset. */
            right: number;
            /** calculated absolute top offset. */
            top: number;
            /** calculated absolute bottom offset. */
            bottom: number;
            /** calculated relative left offset. */
            rleft: number;
            /** calculated relative right offset. */
            rright: number;
            /** calculated relative top offset. */
            rtop: number;
            /** calculated relative bottom offset. */
            rbottom: number;

            sattr();
            /** write content and children to the screen buffer. */
            render() :void;
            /** hide element. */
            hide() :void;
            /** show element. */
            show() :void;
            /** toggle hidden/shown. */
            toggle() :void;
            /** focus element. */
            focus() :void;
            /** bind a keypress listener for a specific key. */
            key(name:string|string[], listener:(character?:any, keyCode?:any) => void) :void;
            /** bind a keypress listener for a specific key once. */
            onceKey(name:string, listener:() => void) :void;
            /** remove a keypress listener for a specific key. */
            unkey(name:string, listener:() => void) :void;
            /** same as el.on('screen', ...) except this will automatically cleanup listeners after the element is detached. */
            onScreenEvent(type, listener:(...args:any[]) => void) :void;
            /** set the z-index of the element (changes rendering order). */
            setIndex(z:number) :void;
            /** put the element in front of its siblings. */
            setFront() :void;
            /** put the element in back of its siblings. */
            setBack() :void;
            /** set the label text for the top-left corner. example options: {text:'foo',side:'left'} */
            setLabel(textOrOptions:string|{}) :void;
            /** remove the label completely. */
            removeLabel() :void;
            /** set the hover text for the bottom-right corner. example options: {text:'foo'} */
            setHover(textOrOptions:string|{}) :void;
            /** remove the hover label completely. */
            removeHover() :void;
            /** set the content. note: when text is input, it will be stripped of all non-SGR escape codes, tabs will be replaced with 8 spaces, and tags will be replaced with SGR codes (if enabled). */
            setContent(text:string) :void;
            /** return content, slightly different from el.content. assume the above formatting. */
            getContent() :void;
            /** similar to setContent, but ignore tags and remove escape codes. */
            setText(text:string) :void;
            /** similar to getContent, but return content with tags and escape codes removed. */
            getText() :void;
            /** insert a line into the box's content. */
            insertLine(index:number, lines:string|string[]) :void;
            /** delete a line from the box's content. */
            deleteLine(index:number) :void;
            /** get a line from the box's content. */
            getLine(index:number) :void;
            /** get a line from the box's content from the visible top. */
            getBaseLine(index:number) :void;
            /** set a line in the box's content. */
            setLine(index:number, line:string) :void;
            /** set a line in the box's content from the visible top. */
            setBaseLine(index:number, line:string) :void;
            /** clear a line from the box's content. */
            clearLine(index:number) :void;
            /** clear a line from the box's content from the visible top. */
            clearBaseLine(index:number) :void;
            /** insert a line at the top of the box. */
            insertTop(lines:string|string[]) :void;
            /** insert a line at the bottom of the box. */
            insertBottom(lines:string|string[]) :void;
            /** delete a line at the top of the box. */
            deleteTop() :void;
            /** delete a line at the bottom of the box. */
            deleteBottom() :void;
            /** unshift a line onto the top of the content. */
            unshiftLine(lines:string|string[]) :void;
            /** shift a line off the top of the content. */
            shiftLine(index:number) :void;
            /** push a line onto the bottom of the content. */
            pushLine(lines:string|string[]) :void;
            /** pop a line off the bottom of the content. */
            popLine(index:number) :void;
            /** an array containing the content lines. */
            getLines() :void;
            /** an array containing the lines as they are displayed on the screen. */
            getScreenLines() :void;
        }


        //
        // Box
        //

        export interface IBoxOptions extends IElementOptions {
            // intentionally empty
        }

        export interface IBox extends IElement {
            // intentionally empty
        }


        //
        // Text
        //

        export interface ITextOptions extends IElementOptions {
            align?: string; //'left'|'center'|'right';
        }

        export interface IText extends IElement {
            // intentionally empty
        }


        //
        // Line
        //

        export interface ILineOptions extends IBoxOptions {
            orientation?: string; //'vertical'|'horizontal';
            style?: IStyle;
        }

        export interface ILine extends IBox {
            // intentionally empty
        }


        //
        // List
        //

        export interface IListStyle extends IStyle {
            selected?: IStyle;
            item?: IStyle;
        }

        export interface IListOptions extends IBoxOptions
        {
            style?: IListStyle;

            /** whether to automatically enable mouse support for this list (allows clicking items). */
            mouse?: boolean;
            /** use predefined keys for navigating the list. */
            keys?: any;
            /** use vi keys with the keys option. */
            vi?: boolean;
            /** an array of strings which become the list's items. */
            items?: string[];
            /** a function that is called when vi mode is enabled and the key / is pressed. This function accepts a callback function which should be called with the search string. The search string is then used to jump to an item that is found in items. */
            search?: (callback:(searchString:string) => void) => void;
            /** whether the list is interactive and can have items selected (default: true). */
            interactive?: boolean;
        }

        export interface IList extends IBox
        {
            /** The text of the currently selected item. */
            value:string;
            /** The items in the list. */
            items:string[];
            /** The index of the current selection. */
            selected:number;

            /** add an item based on a string. */
            addItem(text:string) :void;
            /** returns the item index from the list. child can be an element, index, or string. */
            getItemIndex(child:Element|number|string) :void;
            /** returns the item element. child can be an element, index, or string. */
            getItem(child:Element|number|string) :void;
            /** removes an item from the list. child can be an element, index, or string. */
            removeItem(child:Element|number|string) :void;
            /** clears all items from the list. */
            clearItems() :void;
            /** sets the list items to multiple strings. */
            setItems(items:string[]) :void;
            /** Sets the current selection by absolute index. */
            select(index:number) :void;
            /** Changes the current selection based on current offset. */
            move(offset:number) :void;
            /** select item above selected. */
            up(amount:number) :void;
            /** select item below selected. */
            down(amount:number) :void;
            /** show/focus list and pick an item. the callback is executed with the result. */
            pick(cwd:string, callback:(err:any, file:string) => void) :void;

            /** show/focus list and pick an item. the callback is executed with the result. */
            pick(callback:(err:any, file:string) => void) :void;
        }

        //
        // Input
        //

        export interface IInputOptions extends IBoxOptions {
            // intentionally empty
        }

        export interface IInput extends IBox {
            // intentionally empty
        }

        export interface IInputOptions extends IBoxOptions {
            // intentionally empty
        }

        //
        // Button
        //

        export interface IButton extends IInput {
            // on(event:string, callback:() => void);
            // on(event:'press', callback:() => void);

            /** press button.  emits 'press'. */
            press() :void;
        }


        //
        // Form
        //

        export interface IFormOptions extends IBoxOptions {
            /** allow default keys (tab, vi keys, enter). */
            keys?:boolean;
            /** allow vi keys. */
            vi?:boolean;
        }

        export interface IForm extends IBox
        {
            /** last submitted data. */
            submission :any;

            // on(event:string,   callback:()     => void) :void;
            // on(event:'submit', callback:(data) => void) :void;
            // on(event:'cancel', callback:()     => void) :void;
            // on(event:'reset',  callback:()     => void) :void;

            next() :void;
            previous() :void;

            resetSelected() :void;
            /** focus first form element. */
            focusFirst() :void;
            /** focus last form element. */
            focusLast() :void;
            /** focus next form element. */
            focusNext() :void;
            /** focus previous form element. */
            focusPrevious() :void;
            /** submit the form. */
            submit() :void;
            /** discard the form. */
            cancel() :void;
            /** clear the form. */
            reset() :void;
        }


        //
        // FileManager
        //

        export interface IFileManagerOptions extends IListOptions {
            cwd?: string;
        }

        export interface IDirectoryEntry {
            name: string;
            text: string;
            dir: boolean;
            symlink: boolean;
        }

        export interface IFileManager extends IList
        {
            cwd: string;

            // on(event:string,   callback:()     => void) :void;
            // on(event:'cd', callback:(data) => void) :void;
            // on(event:'file', callback:(data) => void) :void;

            useFormatter (formatterFn:(entry:IDirectoryEntry) => IDirectoryEntry) :void;

            /** refresh the file list (perform a readdir on cwd and update the list items). */
            refresh (cwd?:string, callback?:() => void) :void;

            /** refresh the file list. */
            refresh (callback?:() => void) :void;

            /** pick a single file and return the path in the callback. */
            // pick (cwd?:string, callback?:(result) => void) :void;

            /** reset back to original cwd. */
            reset (cwd?:string, callback?:() => void) :void;
        }


        //
        // Terminal
        //

        export interface ITerminalOptions extends IBoxOptions
        {
            /** handler for input data. */
            handler?: (userInput) => void;
            /** name of shell. $SHELL by default. */
            shell?:string;
            /** args for shell. */
            args?:any;
            /** can be line, underline, and block. */
            cursor?:string; //'line'|'underline'|'block';
        }

        export interface ITerminal extends IBox
        {
            /** reference to the headless term.js terminal. */
            term :any;
            /** reference to the pty.js pseudo terminal. */
            pty :any;

            /** write data to the terminal. */
            write(data:string) :void;
        }
    }

    export = Blessed;
}



