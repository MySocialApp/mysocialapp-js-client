import { ClientService } from "./client_service";
import { User } from "./models/user";
import { AuthenticationToken } from "./models/authentication_token";
import { FluentAccount } from "./fluent_account";
import { FluentConversation } from "./fluent_conversation";
import { FluentEvent } from "./fluent_event";
import { FluentFriend } from "./fluent_friend";
import { FluentGroup } from "./fluent_group";
import { FluentNewsFeed } from "./fluent_news_feed";
import { FluentNotification } from "./fluent_notification";
import { FluentPhoto } from "./fluent_photo";
import { FluentPhotoAlbum } from "./fluent_photo_album";
import { FluentUser } from "./fluent_user";
import { FluentDynamicFeed } from "./fluent_dynamic_feed";
import { WebsocketService } from "./websocket_service";
import { FluentFollow } from "./fluent_follow";
export declare class Session {
    clientService: ClientService;
    auth?: AuthenticationToken;
    private _account?;
    private _conversation?;
    private _event?;
    private _friend?;
    private _follow?;
    private _group?;
    private _newFeed?;
    private _dynamicFeed?;
    private _notification?;
    private _photo?;
    private _photoAlbum?;
    private _user?;
    private _websocket?;
    constructor(clientService: ClientService);
    connect(username: string, password: string): Promise<User>;
    /**
     * Only works for moderator and administrator
     * Return a session as a logged user to interact with API
     * Useful for moderation app
     * Doesn't work with conversation API
     * @param userId
     */
    getSessionAs(userId: string): Promise<Session>;
    updateToken(): void;
    disconnect(): Promise<void>;
    readonly account: FluentAccount;
    readonly conversation: FluentConversation;
    readonly event: FluentEvent;
    readonly friend: FluentFriend;
    readonly follow: FluentFollow;
    readonly group: FluentGroup;
    readonly newsFeed: FluentNewsFeed;
    readonly dynamicFeed: FluentDynamicFeed;
    readonly notification: FluentNotification;
    readonly photo: FluentPhoto;
    readonly photoAlbum: FluentPhotoAlbum;
    readonly user: FluentUser;
    readonly websocket: WebsocketService;
}
