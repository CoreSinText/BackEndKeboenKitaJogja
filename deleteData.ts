import { client } from "./connection.ts";

export async function deleteProduk(idProduk: number) {
    return await client.query(`DELETE FROM produk WHERE produk.produk_id = ${idProduk}`)
}

export async function deleteTransaksi(idTransaksi: number) {
    return await client.query(`DELETE FROM transaksi_penjualan WHERE transaksi_penjualan.transaksi_id = ${idTransaksi}`)
}

export async function deleteAdmin(idAdmin: number) {
    return await client.query(`DELETE FROM user WHERE user.user_id = ${idAdmin}`)
}