import { Rest } from "./rest";
import { Photo } from "../models/photo";
import { FileData } from "../models/file";
export declare class RestShadowEntityProfilePhoto extends Rest {
    get(id: string): Promise<Photo>;
    set(id: string, photo: FileData): Promise<Photo>;
}
