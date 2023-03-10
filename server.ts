import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { tambahProduk, tambahTransaksi, tambahStokBarang, tambahAdmin } from './postData.ts'
import { ubahAdmin, ubahProduk } from './putData.ts'
import { deleteAdmin, deleteProduk, deleteTransaksi } from './deleteData.ts'
import { cariBarang, cariUser, cariProduk } from './search.ts'
import { createToken, decodeToken, userToken, verifyUser } from './auth.ts'
import { client } from './connection.ts'

const router = new Router();

// * Get Produk
router.get("/produk", async (ctx) => {
  const dataProduk = await client.query("SELECT * FROM produk")
  ctx.response.body = dataProduk
});

// * Get Admin
router.get("/admin", async (ctx) => {
  const dataAdmin = await client.query("SELECT * FROM `user` WHERE `user`.is_super_admin = 0")
  ctx.response.body = dataAdmin
})

// * Get Stok Barang
router.get("/stokbarang", async (ctx) => {
  const dataStokBarang = await client.query("SELECT stok_barang.stok_id, stok_barang.produk_id, produk.nama_produk, stok_barang.ketersediaan_barang FROM stok_barang JOIN produk ON produk.produk_id = stok_barang.produk_id")
  ctx.response.body = dataStokBarang
})

// * Get Transaksi
router.get("/transaksi", async (ctx) => {
  const dataTransaksi = await client.query('SELECT transaksi_penjualan.transaksi_id, transaksi_penjualan.nama_pembeli, transaksi_penjualan.tanggal, transaksi_penjualan.jumlah_pembelian, produk.nama_produk, transaksi_penjualan.total_transaksi FROM transaksi_penjualan JOIN produk WHERE produk.produk_id = transaksi_penjualan.produk_id')
  ctx.response.body = dataTransaksi
})

// * Get Cari stok
router.post("/cari/stok", async (ctx) => {
  const reqBody = await ctx.request.body().value
  const search = await cariBarang(reqBody.idStok)
  ctx.response.body = search
})

//* Cari Produk
router.post("/cari/produk", async (ctx) => {
  const reqBody = await ctx.request.body().value
  const search = await cariProduk(reqBody.idProduk)
  ctx.response.body = search
})

// * Post Produk
router.post("/produk/tambah", async (ctx) => {
  if (!ctx.request.hasBody) {
    ctx.throw(415);
  }

  const reqBody = await ctx.request.body().value;
  await tambahProduk(reqBody.namaProduk, reqBody.harga)
  ctx.response.body = `Data produk ${reqBody.namaProduk} berhasil ditambahakan`

})

// * Post Transaksi
router.post("/transaksi/tambah", async (ctx) => {
  const reqBody = await ctx.request.body().value
  await tambahTransaksi(reqBody.tanggal, reqBody.namaPembeli, reqBody.produkId, reqBody.jumlah, reqBody.total)
  ctx.response.body = `Data transaksi berhasil ditambahakan`
})

// * Post Tambah Stok Barang
router.post("/stokbarang/tambah", async (ctx) => {
  const reqBody = await ctx.request.body().value
  tambahStokBarang(reqBody.idBarang, reqBody.stokSebelum, reqBody.barangMasuk)
  ctx.response.body = `Data Barang Berhasil Ditambahkan`

})

// * Post Tambah Admin
router.post("/admin/tambah", async (ctx) => {
  const reqBody = await ctx.request.body().value
  const pass = await createToken(reqBody.password)
  tambahAdmin(reqBody.namaUser, reqBody.jk, reqBody.noHp, reqBody.alamat, pass)
  ctx.response.body = `Data Barang Berhasil Ditambahkan`
})

// * Put Data Admin
router.put("/admin/ubah", async (ctx) => {
  const reqBody = await ctx.request.body().value
  ubahAdmin(reqBody.newName, reqBody.newJk, reqBody.newNomor, reqBody.newAlamat, reqBody.newPassword, reqBody.userId)
  ctx.response.body = `Data Admin Berhasil Di Ubah`

})

// * Put Data Produk
router.put("/produk/ubah", async (ctx) => {
  const reqBody = await ctx.request.body().value
  ubahProduk(reqBody.produkId, reqBody.namaProduk, reqBody.harga)
  ctx.response.body = `Data Produk Berhasil Diubah`
})

// * Delete Produk
router.delete("/produk/hapus", async (ctx) => {
  const reqBody = await ctx.request.body().value
  deleteProduk(reqBody.idProduk)
  ctx.response.body = `Data Produk Berhasi Dirubah`
})

// * Delete Transaksi
router.delete("/transaksi/hapus", async (ctx) => {
  const reqBody = await ctx.request.body().value
  deleteTransaksi(reqBody.idTransaksi)
  ctx.response.body = `Data Transaksi Berhasil Dirubah`
})

// * Delete Admin
router.delete("/admin/hapus", async (ctx) => {
  const reqBody = await ctx.request.body().value
  deleteAdmin(reqBody.idAdmin)
  ctx.response.body = `Data Admin Berhasil Dihapus`
})


// * Login
router.post("/keboen/login", async (ctx) => {
  const reqBody = await ctx.request.body().value
  const dataUser = await client.query(`SELECT * FROM user WHERE user.nama_user = "${reqBody.username}"`)
  // Login(dataUser)
  if (dataUser.length === 0) {
    ctx.response.status = 401
    return ctx.response.body = { message: "Username tidak ditemukan" }
  } else {
    const haveUsername: any = dataUser[0]
    if (await decodeToken(haveUsername.password) == reqBody.password) {

      ctx.response.body = {
        nama: haveUsername.nama_user,
        password: reqBody.password,
        pemilik: haveUsername.is_super_admin
      }
    } else {
      ctx.response.status = 401
      ctx.response.body = { message: "Login Gagal" }
    }

  }

})

router.post("/local/token", async (ctx) => {
  const reqBody = await ctx.request.body().value
  const data = await userToken(reqBody.pemilik)
  ctx.response.body = {
    status: data
  }
})

router.put("/local/decode", async (ctx) => {
  const reqBody = await ctx.request.body().value
  const data: any = await verifyUser(reqBody.data)
  ctx.response.body = `${data}`
})


const app = new Application();
app.use(oakCors({ credentials: true, origin: "http://localhost:3000" }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });