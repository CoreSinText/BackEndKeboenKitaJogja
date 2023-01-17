import { client } from "./connection.ts";

// * Mengubah Data Admin
export function ubahAdmin(newName: string, newJk: string, newNomor: number, newAlamat: string, newPassword: string, userId: number) {
    client.query(`UPDATE user SET nama_user = "${newName}", jenis_kelamin = "${newJk}", nomor_telepon = ${newNomor}, alamat="${newAlamat}", password="${newPassword}" WHERE user_id = ${userId}`)
}

// * Mengubaha data Produk
export function ubahProduk(produkId: number, namaProduk: string, harga: number) {
    client.query(`UPDATE produk SET nama_produk = "${namaProduk}", harga_produk = ${harga} WHERE produk.produk_id = ${produkId}`)
}