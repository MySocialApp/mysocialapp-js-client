import {ClientService} from "./client_service";
import {User} from "./models/user";
import {AuthenticationToken} from "./models/authentication_token";
import {LoginCredentials} from "./models/login_credentials";
import {FluentAccount} from "./fluent_account";
import {FluentFeed} from "./fluent_feed";
import {FluentConversation} from "./fluent_conversation";
import {FluentEvent} from "./fluent_event";
import {FluentFriend} from "./fluent_friend";
import {FluentGroup} from "./fluent_group";
import {FluentNewsFeed} from "./fluent_news_feed";
import {FluentNotification} from "./fluent_notification";
import {FluentPhoto} from "./fluent_photo";
import {FluentPhotoAlbum} from "./fluent_photo_album";
import {FluentUser} from "./fluent_user";

export class Session {
    clientService: ClientService;
    auth?: AuthenticationToken;

    private _account?: FluentAccount;
    private _conversation?: FluentConversation;
    private _event?: FluentEvent;
    private _feed?: FluentFeed;
    private _friend?: FluentFriend;
    private _group?: FluentGroup;
    private _newFeed?: FluentNewsFeed;
    private _notification?: FluentNotification;
    private _photo?: FluentPhoto;
    private _photoAlbum?: FluentPhotoAlbum;
    private _user?: FluentUser;

    constructor(clientService: ClientService) {
        this.clientService = clientService;
    }

    async connect(username: string, password: string): Promise<User> {
        return new Promise<User>((async (resolve, reject) => {
            try {
                this.auth = await this.clientService.login.create(new LoginCredentials({
                    username: username,
                    password: password
                }));
                this.clientService.configuration.setAuth(this.auth);
                this.account.get().then(user => resolve(user));
            } catch (err) {
                reject(err);
            }
        }));
    }

    disconnect(): Promise<void> {
        return this.clientService.logout.do();
    }

    get account(): FluentAccount {
        return this._account !== undefined ? this._account : this._account = new FluentAccount(this);
    }

    get conversation(): FluentConversation {
        return this._conversation !== undefined ? this._conversation : this._conversation = new FluentConversation(this);
    }

    get event(): FluentEvent {
        return this._event !== undefined ? this._event : this._event = new FluentEvent(this);
    }

    get feed(): FluentFeed {
        return this._feed !== undefined ? this._feed : this._feed = new FluentFeed(this);
    }

    get friend(): FluentFriend {
        return this._friend !== undefined ? this._friend : this._friend = new FluentFriend(this);
    }

    get group(): FluentGroup {
        return this._group !== undefined ? this._group : this._group = new FluentGroup(this);
    }

    get newsFeed(): FluentNewsFeed {
        return this._newFeed !== undefined ? this._newFeed : this._newFeed = new FluentNewsFeed(this);
    }

    get notification(): FluentNotification {
        return this._notification !== undefined ? this._notification : this._notification = new FluentNotification(this);
    }

    get photo(): FluentPhoto {
        return this._photo !== undefined ? this._photo : this._photo = new FluentPhoto(this);
    }

    get photoAlbum(): FluentPhotoAlbum {
        return this._photoAlbum !== undefined ? this._photoAlbum : this._photoAlbum = new FluentPhotoAlbum(this);
    }

    get user(): FluentUser {
        return this._user !== undefined ? this._user : this._user = new FluentUser(this);
    }
}