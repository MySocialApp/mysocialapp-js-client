import {AccessControl} from "./access_control";
import {Serializable} from "./model";
import {TextWallMessage} from "./text_wall_message";
import {TagEntities} from "./tag_entities";
import {FileData} from "./file";

export class FeedPost implements Serializable {
    _message?: string;
    _image?: FileData;
    _visibility?: AccessControl;
    _tag_entities?: TagEntities;
    payload?: {};


    toJson(): string {
        return JSON.stringify(this.getJsonParameters());
    }

    getJsonParameters(): {} {
        let j = {
            message: this._message,
            access_control: this._visibility !== undefined ? this._visibility : AccessControl.Friend,
        };
        if (this.payload) {
            j['payload'] = this.payload;
        }
        return j
    }

    setMessage(message: string): FeedPost {
        this._message = message;
        return this;
    }

    setImage(image: FileData): FeedPost {
        this._image = image;
        return this;
    }

    setTagEntities(t: TagEntities) {
        this._tag_entities = t;
    }

    setVisibility(visible: AccessControl): FeedPost {
        this._visibility = visible;
        return this;
    }

    setPayload(payload: {}): FeedPost {
        this.payload = payload;
        return this;
    }

    hasPhoto(): boolean {
        return this._image !== undefined;
    }

    get textWallMessage(): TextWallMessage {
        return new TextWallMessage({}).setVisibility(this._visibility).setMessage(this._message).setTagEntities(this._tag_entities).setPayload(this.payload);
    }
}