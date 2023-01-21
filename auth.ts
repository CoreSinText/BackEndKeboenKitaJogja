import * as djwt from "https://deno.land/x/djwt@v2.8/mod.ts";

const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);

const key2 = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"],
);

export async function createToken(data: any) {
    return await djwt.create({ alg: "HS512", type: "JWT" }, data, key)
}

export async function decodeToken(data: any) {
    const [payload, signature, header] = djwt.decode(data)
    return await signature
}


export async function userToken(pemilik: any) {
    return await djwt.create({ alg: "HS256", type: "JWT" }, { 'pemilik': pemilik }, key2)
}

export async function verifyUser(data: any) {
    const [payload, signature, header] = djwt.decode(data)

    return await payload
}