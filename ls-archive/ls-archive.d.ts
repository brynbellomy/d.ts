

declare module "ls-archive"
{
    import buffer = require('buffer')
    module LSArchive
    {
        export function list (archivePath:string, callback:(error:any, archiveEntries:ArchiveEntry[]) => void): void;
        export function read (archivePath:string, filePath:string, callback:(error:any, filePathContents:Buffer) => void): void;
        export function readGzip (gzipArchivePath:string, callback:(error:any, buffer:Buffer) => void): void;

        export class ArchiveEntry
        {
            path: string;
            type: number;

            isFile() :boolean;
            isFolder() :boolean;
            isSymbolicLink() :boolean;
            getPath() :string;
        }
    }

    export = LSArchive;
}