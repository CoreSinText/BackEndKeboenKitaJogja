import { client } from "./connection.ts";

export function deleteProduk(idProduk:number){
client.query(`DELETE FROM produk WHERE produk.produk_id = ${idProduk}`)
}

export function deleteTransaksi(idTransaksi:number){
    client.query(`DELETE FROM transaksi_penjualan WHERE transaksi_penjualan.transaksi_id = ${idTransaksi}`)
}

export function deleteAdmin(idAdmin:number){
    client.query(`DELETE FROM user WHERE user.user_id = ${idAdmin}`)
}