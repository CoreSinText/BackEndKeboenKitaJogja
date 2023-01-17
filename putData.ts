import { client } from "./connection.ts";

// * Mengubah Data Admin
export function ubahAdmin(newName:string, newJk:string, newNomor:number, newAlamat:string, newPassword:string, userId:number){
    client.query(`UPDATE user SET nama_user = "${newName}", jenis_kelamin = "${newJk}", nomor_telepon = ${newNomor}, alamat="${newAlamat}", password="${newPassword}" WHERE user_id = ${userId}`)
}

// * Mengubaha data Admin
export function ubahProduk(produkId:number){
    client.query(`UPDATE produk SET nama_produk = "asdads", harga_produk = 2123 WHERE produk.produk_id = ${produkId}`)
}