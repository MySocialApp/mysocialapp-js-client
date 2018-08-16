import {Session} from "./session";
import {Configuration} from "./configuration";
import {ClientConfiguration} from "./client_configuration";
import {ClientService} from "./client_service";
import {User} from "./models/user";

export class MySocialApp {

    private _session: Session;
    private _client_configuration: ClientConfiguration;

    private _appId: string;
    private _apiEndpoint: string;

    constructor() {

    }

    setAppId(appId: string): MySocialApp {
        this._appId = appId;
        return this
    }

    setAppEndpoint(endpoint: string): MySocialApp {
        this._apiEndpoint = endpoint;
        return this
    }

    setClientConfiguration(clientConfiguration: ClientConfiguration): MySocialApp {
        this._client_configuration = clientConfiguration;
        return this;
    }

    get configuration(): Configuration {
        return new Configuration(this._appId, this._apiEndpoint);
    }

    async createAccount(email: string, password: string, firstName: string): Session {
        let clientService = new ClientService(this.configuration);
        await clientService.register.create(new User({
            email: email,
            password: password,
            first_name: firstName
        }));
        let session = new Session(clientService);
        await session.connect(email, password);
        return session;
    }

    async connect(email: string, password: string): Session {
        let session = new Session(new ClientService(this.configuration));
        await this.publicSession.connect(email, password);
        return session;
    }

    get publicSession(): Session {
        return new Session(new ClientService(this.configuration));
    }

    async resetPassword(email: string): void {
        return this.publicSession.account.resetPassword(email);
    }
}