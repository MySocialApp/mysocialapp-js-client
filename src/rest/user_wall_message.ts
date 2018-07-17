import {Rest} from "./rest";
import {Feed} from "../models/feed";
import {TextWallMessage} from "../models/text_wall_message";

export class RestUserWallMessage extends Rest {
    list(userId: string): Promise<Feed[]> {
        return this.conf.getList(new Feed(), Rest.params("/user/{userId}/wall/message", {userId: userId})) as Promise<Feed[]>;
    }

    post(userId: string, message: TextWallMessage): Promise<Feed> {
        return this.conf.post(new Feed(), Rest.params("user/{userId}/wall/message", {userId: userId}), message) as Promise<Feed>;
    }

    put(userId: string, messageId: string, message: TextWallMessage): Promise<Feed> {
        return this.conf.put(new Feed(), Rest.params("user/{userId}/wall/message/{messageId}", {
            userId: userId,
            messageId: messageId
        }), message) as Promise<Feed>;
    }

    delete(userId: string, messageId: string): Promise<void> {
        return this.conf.delete(Rest.params("user/{userId}/wall/message/{messageId}", {
            userId: userId,
            messageId: messageId
        })) as Promise<void>;
    }
}