# 📊 Portföy Takip

Kripto, hisse ve emtia alım-satımlarınızı takip eden; **ortalama maliyet** ve
**aylık kâr/zarar** hesaplayan, iPhone'a kurulabilen bir web uygulaması (PWA).

- ✅ Kripto / Hisse / Emtia ayrı ayrı
- ✅ Sembol (örn. CHZ), adet ve **USD fiyat** girersiniz
- ✅ O günkü **USD/TRY kuru** internetten otomatik kaydedilir (elle de girilebilir)
- ✅ Birden fazla alışın **ortalaması** otomatik hesaplanır
- ✅ Satışta **gerçekleşen kâr/zarar** hem **dolar** hem **TL** olarak
- ✅ **Aylık kâr/zarar** raporu
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

## 🔢 Hesaplama Mantığı

- **Ortalama alış (USD):** adet ağırlıklı ortalama
  `(adet₁·fiyat₁ + adet₂·fiyat₂ + …) / toplam adet`
- **Ortalama alış (TL):** her alışın `USD fiyat × o günkü kur` değeriyle ağırlıklı ortalama
- **Satışta gerçekleşen K/Z (USD):** `(satış fiyatı − ortalama maliyet) × adet`
- **Satışta gerçekleşen K/Z (TL):** `(satış fiyatı × satış kuru − ortalama TL maliyet) × adet`
  → böylece hem varlık kazancını hem kur farkını içerir
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
