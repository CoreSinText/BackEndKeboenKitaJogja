import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import {getAdmin,getProduk,getStokBarang,getTransaksiPenjualan} from './getData.ts'
import { tambahProduk, tambahTransaksi, tambahStokBarang} from './postData.ts'

const router = new Router();

// * Get Produk
router.get("/produk", async (ctx) => {
  const dataProduk = await getProduk  
  ctx.response.body = dataProduk
});

// * Get Admin
router.get("/admin", async (ctx)=>{
  const dataAdmin = await getAdmin
  ctx.response.body = dataAdmin
})

// * Get Stok Barang
router.get("/stokbarang",async (ctx)=>{
  const dataStokBarang = await getStokBarang
  ctx.response.body = dataStokBarang
})

router.get("/transaksi", async (ctx)=>{
  const dataTransaksi = await getTransaksiPenjualan
  ctx.response.body = dataTransaksi
  ctx.response.status = 200
})

// * Post Produk
router.post("/produk/tambah", async(ctx)=>{
  if (!ctx.request.hasBody) {
    ctx.throw(415);
  }

  const reqBody = await ctx.request.body().value;
  await tambahProduk(reqBody.namaProduk, reqBody.harga)
  ctx.response.body = `Data produk ${reqBody.namaProduk} berhasil ditambahakan`

})

// * Post Transaksi
router.post("/transaksi/tambah", async(ctx)=>{
  const reqBody = await ctx.request.body().value
  await tambahTransaksi(reqBody.tanggal,reqBody.namaPembeli, reqBody.produkId, reqBody.jumlah, reqBody.total)
  ctx.response.body = `Data transaksi berhasil ditambahakan`
})

// * Post Tambah Stok Barang
router.post("/stokbarang/tambah", async(ctx)=>{
  const reqBody = await ctx.request.body().value
  tambahStokBarang(reqBody.idBarang, reqBody.stokSebelum, reqBody.barangMasuk)
  ctx.response.body = `Data Barang Berhasil Ditambahkan`

})


const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });