import {FluentAbstract} from "./fluent_abstract";
import {Feed} from "./models/feed";
import {FeedPost} from "./models/feed_post";
import {SearchResults} from "./models/search_results";
import {SearchFeed} from "./search/feed";


export class FluentNewsFeed extends FluentAbstract {

    async list(page: number, size: number = 10, params?: {}, algorithm?: {}): Promise<Feed[]> {
        return this.session.clientService.feed.list(page, size, params, algorithm);
    }

    async* stream(params?: {}, algorithm?: {}) {
        let page = 0;
        while (true) {
            let feeds = await this.list(page++, 10, params, algorithm);
            if (!feeds.length) {
                return;
            }
            for (let feed of feeds) {
                yield feed;
            }
        }
    }

    async get(id: string): Promise<Feed> {
        return this.session.clientService.feed.get(id);
    }

    async getByExternalId(id: string): Promise<Feed> {
        return this.session.clientService.feedExternal.get(id);
    }

    async create(feedPost: FeedPost): Promise<Feed> {
        let account = await this.session.account.get(true);
        if (!feedPost.hasPhoto()) {
            return this.session.clientService.userWallMessage.create(account.id, feedPost.textWallMessage)
        }
        return this.session.clientService.photo.create(feedPost._image, feedPost._message, feedPost._tag_entities, null, feedPost._visibility, feedPost.payload ? JSON.stringify(feedPost.payload) : undefined);
    }

    async search(search: SearchFeed, page: number, size: number = 10): Promise<SearchResults> {
        return this.session.clientService.search.get(page, size, search.toQueryParams());
    }
}