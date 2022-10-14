import { WebAuth } from "auth0-js";

export const webAuth = new WebAuth({
    clientID: 'wfKM8a6WO6mZARYEN9yB2fCFIgrtuh8K',
    domain: 'dev-8xxbv-mc.us.auth0.com',
    redirectUri: 'https://ueofp.sse.codesandbox.io/coupon',
    responseType: "token"
});

