import {Account} from "./models/account";
import {CustomField} from "./models/custom_field";
import {FluentAbstract} from "./fluent_abstract";
import {Photo} from "./models/photo";
import {LoginCredentials} from "./models/login_credentials";
import {AccountEvents} from "./models/account_events";
import {ResetIdentifier} from "./models/reset_identifier";

export class FluentAccount extends FluentAbstract {
    account?: Account;

    async get(useCache?: boolean): Promise<Account> {
        if (useCache && this.account !== undefined) {
            return this.account;
        }
        const resp = await this.session.clientService.account.get();
        this.account = resp;
        return resp;
    }

    async getAvailableCustomFields(): Promise<CustomField[]> {
        const acc = await this.get();
        return acc.custom_fields;
    }

    async changeProfilePhoto(photo: File): Promise<Photo> {
        return this.session.clientService.account.updateProfilePhoto(photo);
    }

    async changeProfileCoverPhoto(photo: File): Promise<Photo> {
        return this.session.clientService.account.updateCover(photo);
    }

    async requestForDeleteAccount(password: string): Promise<void> {
        return this.session.clientService.account.delete(new LoginCredentials({password: password}))
    }

    async getEvents(): Promise<AccountEvents> {
        return this.session.clientService.configuration.get(new AccountEvents(), "/account/event") as Promise<AccountEvents>;
    }

    async resetPassword(email: string): Promise<void> {
        return this.session.clientService.configuration.postVoid("/reset", new ResetIdentifier({email: email}))
    }
}