import {ClientService} from "../../src/client_service";
import {Configuration} from "../../src/configuration";
import {LoginCredentials} from "../../src/models/login_credentials";
import {banner} from "./common";
/*
export async function run() {
    try {
        banner("Authentication");
        let appId = "u470584465854a194805"; // MySocialApp demo app Id
        let config = new Configuration(appId);
        let client = new ClientService(config);

        let resp = await client.login.post(<LoginCredentials>{username:"username", password:"password"});
        console.log(resp);
    }
    catch (err) {
        console.info("error", err)
    }
}
*/