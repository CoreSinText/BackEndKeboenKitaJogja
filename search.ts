import { client } from "./connection.ts";

// * Cari Barang
export async function cariBarang(idStok: number) {
    return await client.query(`SELECT * FROM stok_barang WHERE stok_barang.stok_id = ${idStok}`)
}

export async function cariUser(idUser: number) {
    return await client.query(`SELECT * FROM user WHERE user.user_id = ${idUser}`)
}

export async function cariProduk(idProduk: number) {
    return await client.query(`SELECT * FROM produk WHERE produk_id = ${idProduk}`)
}