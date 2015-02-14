

declare module "ls-r"
{
    function ls(paths:string, options:any, callback:(error:any, paths:string[], fileStats:FileResult[]) => void) :void;

    export = ls;

    interface FileResult
    {
        dev: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        blksize: number;
        ino: number;
        size: number;
        blocks: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
        path: string;
    }
}
