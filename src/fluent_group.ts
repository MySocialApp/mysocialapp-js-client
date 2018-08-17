import {FluentAbstract} from "./fluent_abstract";
import {Group} from "./models/group";
import {Event} from "./models/event";

export class FluentGroup extends FluentAbstract {

    async list(page: number, size: number = 10, options: {} = {}): Group[] {
        return this.session.clientService.group.list(page, undefined, size, undefined, options);
    }

    async get(id: string): Group {
        return this.session.clientService.group.get(id);
    }


    async create(group: Group): Group {
        return this.session.clientService.group.create(group);
    }

    /**
     * TODO : complete search with search builder
     * @param {{}} search
     * @param {number} page
     * @param {number} size
     * @returns {Promise<Group[]>}
     */
    async search(search: {}, page: number, size: number = 10): Group[] {
        return this.session.clientService.group.list(page, undefined, size);
    }
}