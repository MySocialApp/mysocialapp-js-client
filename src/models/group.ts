import {BaseWall} from "./base_wall";
import {Photo} from "./photo";
import {CustomField} from "./custom_field";
import {GroupMember} from "./group_member";
import {GroupMemberAccessControl} from "./group_member_access_control";
import {Location} from "./location";
import {Feed} from "./feed";
import {TextWallMessage} from "./text_wall_message";
import {RestGroup} from "../rest/group";
import {RestGroupWall} from "../rest/group_wall";
import {listToParameters} from "./utils";
import {FileData} from "./file";
import {FeedPost} from "./feed_post";

export class Group extends BaseWall {
    private _location?: Location;
    private _profile_photo?: Photo;
    private _profile_cover_photo?: Photo;
    private _members?: GroupMember[];
    private _custom_fields?: CustomField[];

    name: string;
    description: string;
    open: boolean;
    member: boolean;
    approvable: boolean;
    distance_in_meters: number;
    total_members: number;
    group_member_access_control: GroupMemberAccessControl;

    getJsonParameters(): {} {
        let o = {
            id: this.id,
            name: this.name,
            description: this.description,
            group_member_access_control: this.group_member_access_control,
            location: this.location ? this.location.getJsonParameters() : null,
        };
        if (this.custom_fields) {
            o['custom_fields'] = listToParameters(this.custom_fields);
        }
        if (this.payload !== undefined) {
            o['payload'] = this.payload;
        }
        return o;
    }

    async listNewsFeed(page: number, size: number): Promise<Feed[]> {
        return new RestGroupWall(this.conf).list(this.id, page, size);
    }

    async createFeedPost(feedPost: FeedPost): Promise<Feed> {
        return new RestGroupWall(this.conf).createMessage(this.id, feedPost.textWallMessage);
    }

    async join(): Promise<GroupMember> {
        return (new RestGroup(this.conf)).join(this.id);
    }

    async leave(): Promise<void> {
        return (new RestGroup(this.conf)).leave(this.id);
    }

    /**
     * only for owner or moderator
     */
    async delete(): Promise<void> {
        return (new RestGroup(this.conf)).delete(this.id);
    }

    async update(): Promise<Group> {
        return (new RestGroup(this.conf)).update(this);
    }

    async changeOwner(newOwnerId: string): Promise<Group> {
        return (new RestGroup(this.conf)).changeOwner(this.id, newOwnerId);
    }

    async addMessage(message: TextWallMessage): Promise<Feed> {
        return (new RestGroupWall(this.conf)).createMessage(this.id, message);
    }

    setName(name: string): Group {
        this.name = name;
        return this;
    }

    setDescription(desc: string): Group {
        this.description = desc;
        return this;
    }

    setAccessControl(ac: GroupMemberAccessControl): Group {
        this.group_member_access_control = ac;
        return this;
    }

    setLocation(l: Location): Group {
        this.location = l;
        return this;
    }

    get custom_fields(): CustomField[] {
        return this._custom_fields;
    }

    set custom_fields(c: CustomField[]) {
        if (!c) {
            return;
        }
        let list = [] as CustomField[];
        for (let m of c) {
            list.push(new CustomField(m, this.conf))
        }
        this._custom_fields = list;
    }

    get members(): GroupMember[] {
        return this._members;
    }

    set members(members: GroupMember[]) {
        if (!members) {
            return;
        }
        let list = [] as GroupMember[];
        for (let m of members) {
            list.push(new GroupMember(m, this.conf))
        }
        this._members = list;
    }

    get cover_image(): Photo {
        return this.profile_cover_photo;
    }

    get profile_cover_photo(): Photo {
        return this._profile_cover_photo;
    }

    set profile_cover_photo(p: Photo) {
        this._profile_cover_photo = new Photo(p, this.conf);
    }

    get image(): Photo {
        return this.profile_photo;
    }

    get profile_photo(): Photo {
        return this._profile_photo;
    }

    set profile_photo(p: Photo) {
        this._profile_photo = new Photo(p, this.conf);
    }


    get location(): Location {
        return this._location;
    }

    set location(l: Location) {
        this._location = new Location(l);
    }

    updateImage(file: FileData): Promise<Photo> {
        return new RestGroup(this.conf).updateProfilePhoto(this.id, file);
    }

    updateCoverImage(file: FileData): Promise<Photo> {
        return new RestGroup(this.conf).updateProfileCoverPhoto(this.id, file);
    }

    async getMembers(): Promise<GroupMember[]> {
        if (this.members !== undefined) {
            return this.members;
        }
        return new RestGroup(this.conf).getMembers(this.id);
    }
}