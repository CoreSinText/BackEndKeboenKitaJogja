import {client} from './connection.ts'


// * Menambahkan Data Produk
export  function tambahProduk(namaProduk:string, hargaProduk:number){
return  client.query(`INSERT INTO produk (nama_produk, harga_produk) VALUE ('${namaProduk}', ${hargaProduk})`)
}

// * Menambahkan Data Transaksi
export function tambahTransaksi(tanggal:string, namaPembeli:string,produkId:number, jumlahPembelian:number, totalTransaksi:number){
    return client.query(`INSERT INTO transaksi_penjualan (tanggal, nama_pembeli, produk_id, jumlah_pembelian, total_transaksi) VALUE ('${tanggal}', '${namaPembeli}', ${produkId}, ${jumlahPembelian}, ${totalTransaksi})`)
}

// * Menambahkan Data Stok Barang
export function tambahStokBarang (idBarang:number, stokSebelumnya:number, barangMasuk:number){
    return client.query(`UPDATE stok_barang SET ketersediaan_barang = ${stokSebelumnya} + ${barangMasuk} WHERE stok_id = ${idBarang}`)
}
