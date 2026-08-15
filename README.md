# 📊 Portföy Takip

Kripto, hisse ve emtia alım-satımlarınızı takip eden; **ortalama maliyet** ve
**aylık kâr/zarar** hesaplayan, iPhone'a kurulabilen bir web uygulaması (PWA).

- ✅ Kripto / Hisse / Emtia ayrı ayrı
- ✅ Sembol (örn. CHZ), adet ve **USD fiyat** girersiniz
- ✅ O günkü **USD/TRY kuru** internetten otomatik kaydedilir (elle de girilebilir)
- ✅ Birden fazla alışın **ortalaması** otomatik hesaplanır
- ✅ **Komisyon** (borsa işlem ücreti) ana paradan otomatik düşülür
- ✅ Satışta **gerçekleşen kâr/zarar** hem **dolar** hem **TL** olarak
- ✅ **Aylık kâr/zarar** raporu
- ✅ **Yedekle / Geri Yükle** (dışa-içe aktar) ile veriyi başka cihaza taşıma
- ✅ Veriler telefonunuzda saklanır (internet olmadan da açılır)
- ✅ Mac / Xcode / geliştirici hesabı **gerekmez**

---

## 📲 iPhone'a Nasıl Kurulur?

Uygulama, GitHub Pages üzerinden ücretsiz ve HTTPS ile yayınlanır.

### 1) GitHub Pages'i açın (tek seferlik)
1. GitHub'da bu depoya girin → **Settings → Pages**
2. **Build and deployment → Source** kısmını **GitHub Actions** yapın
3. `claude/stock-commodity-crypto-app-njeohg` (veya `main`) branch'ine her push'ta
   uygulama otomatik yayınlanır. **Actions** sekmesinde derlemenin bitmesini bekleyin.
4. Yayın adresiniz şöyle olur:
   `https://<kullanıcı-adınız>.github.io/desktop-tutorial/`

### 2) Ana ekrana ekleyin
1. iPhone'da **Safari** ile yukarıdaki adresi açın
2. Alttaki **Paylaş** simgesine (⬆️ kare) dokunun
3. **"Ana Ekrana Ekle"** seçin → **Ekle**
4. Artık ana ekranınızda **Portföy** uygulaması gibi çalışır (tam ekran, çevrimdışı)

> Not: PWA'nın tam olarak kurulabilmesi için sayfayı **Safari** ile açın
> (Chrome'da "Ana Ekrana Ekle" iOS'ta kısıtlıdır).

---

## 🧮 Nasıl Kullanılır?

1. Alttaki mavi **+** butonuna basın
2. **Kategori** seçin (Kripto / Hisse / Emtia)
3. **Alış** veya **Satış** seçin
4. **Sembol** (örn. `CHZ`), **adet** ve **USD fiyat** girin
5. **Dolar kuru** otomatik gelir — bugünden farklı bir tarih girdiyseniz
   kuru elle yazabilir veya **Yenile**'ye basabilirsiniz
6. **Kaydet**

**Portföy** sekmesinde her sembolün ortalama alış fiyatını (USD ve TL),
mevcut adedini ve gerçekleşen kâr/zararını görürsünüz.
**Rapor** sekmesinde aylık kâr/zarar dökümü çıkar.

---

## 💸 Komisyon

Her işlemde **karşı para** (USDT / TL çifti) ve **emir tipi** (piyasa yapıcı /
piyasa alıcı) seçersiniz; komisyon oranı otomatik gelir (elle de değiştirilebilir).
Oranları sağ üstteki **⚙︎ Ayarlar**'dan borsanızın kademesine göre düzenleyebilirsiniz.

- **Alışta:** komisyon maliyete eklenir → gerçek birim maliyet `fiyat × (1 + komisyon%)`
- **Satışta:** komisyon kârdan düşülür → net satış `fiyat × (1 − komisyon%)`

Varsayılan oranlar (örnek borsa): USDT çifti yapıcı %0,01 / alıcı %0,1 —
TL çifti yapıcı %0,12 / alıcı %0,28.

## 🔢 Hesaplama Mantığı

- **Ortalama maliyet (USD):** komisyon dahil, adet ağırlıklı ortalama
  `(adet₁·efektif_fiyat₁ + adet₂·efektif_fiyat₂ + …) / toplam adet`
  (efektif fiyat = `fiyat × (1 + komisyon%)`)
- **Ortalama maliyet (TL):** her alışın `efektif USD fiyat × o günkü kur` değeriyle ağırlıklı ortalama
- **Satışta gerçekleşen K/Z (USD):** `(net satış fiyatı − ortalama maliyet) × adet`
- **Satışta gerçekleşen K/Z (TL):** `(net satış fiyatı × satış kuru − ortalama TL maliyet) × adet`
  → böylece hem varlık kazancını, hem kur farkını, hem komisyonu içerir
- **Aylık rapor:** satış işlemlerinin gerçekleştiği aya göre gruplanır

---

## 🛠️ Teknik

- Saf HTML/CSS/JS — bağımlılık yok (`index.html`)
- Depolama: tarayıcı `localStorage` (veriler yalnızca sizin telefonunuzda)
- Kur kaynağı: [open.er-api.com](https://www.exchangerate-api.com/) (ücretsiz, anahtar gerektirmez)
- Çevrimdışı: `sw.js` (Service Worker)
- Yayın: GitHub Pages (`.github/workflows/deploy-pages.yml`)

### Bilgisayarda denemek için
```bash
python3 -m http.server 8000
# tarayıcıda: http://localhost:8000
```
