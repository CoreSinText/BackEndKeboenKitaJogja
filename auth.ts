import * as djwt from "https://deno.land/x/djwt@v2.8/mod.ts";

const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);

export async function createToken(data: any) {
    return await djwt.create({ alg: "HS512", type: "JWT" }, data, key)
}

export async function decodeToken(data: any) {
    return await djwt.decode(data)
}

