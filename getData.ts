import {client} from './connection.ts'
export const getProduk = client.query("SELECT * FROM produk")
export const getStokBarang = client.query("SELECT stok_barang.stok_id, stok_barang.produk_id, produk.nama_produk, stok_barang.ketersediaan_barang FROM stok_barang JOIN produk ON produk.produk_id = stok_barang.produk_id")
export const getTransaksiPenjualan = client.query('SELECT transaksi_penjualan.transaksi_id, transaksi_penjualan.nama_pembeli, transaksi_penjualan.tanggal, transaksi_penjualan.jumlah_pembelian, produk.nama_produk, transaksi_penjualan.total_transaksi FROM transaksi_penjualan JOIN produk WHERE produk.produk_id = transaksi_penjualan.produk_id')
export const getAdmin = client.query("SELECT * FROM `user` WHERE `user`.is_super_admin = 0")
