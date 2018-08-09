import {Rest} from "./rest";
import {Comment} from "../models/comment";
import {Photo} from "../models/photo";
import {TagEntities} from "../models/tag_entities";

export class RestStatusComment extends Rest {
    list(statusId: string): Promise<Comment[]> {
        return this.conf.getList(new Comment(), Rest.params("/status/{id}/comment", {id: statusId})) as Promise<Comment[]>;
    }

    create(statusId: string, comment: Comment): Promise<Comment> {
        return this.conf.post(new Comment(), Rest.params("/status/{id}/comment", {id: statusId}), comment) as Promise<Comment>;
    }

    update(statusId: string, commentId: string, comment: Comment): Promise<Comment> {
        let path = Rest.params("/status/{id}/comment/{commentId}", {id: statusId, commentId: commentId});
        return this.conf.put(new Comment(), path, comment) as Promise<Comment>;
    }

    createPhoto(statusId: string, photo: File, message?: string, tagEntities?: TagEntities): Promise<Photo> {
        let f = new FormData();
        f.set("file", photo);
        if (message !== undefined) {
            f.set("name", message);
        }
        if (tagEntities !== undefined) {
            f.set("tag_entities", tagEntities.toJson());
        }
        let path = Rest.params("/status/{id}/comment/photo", {id: statusId});
        return this.conf.postMultipart(new Photo(), path, f) as Promise<Photo>;
    }
}