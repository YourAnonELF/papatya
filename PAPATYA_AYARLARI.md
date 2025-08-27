# 🌼 Papatya Animasyon Ayarları Kılavuzu

## 📍 Pozisyonlama Parametreleri

### **1. Merkez Kaydırma (Center Offset)**

#### **X Ekseni (Yatay) Kaydırma:**
```javascript
const centerOffsetX = -50; // Sola 50px kaydır
const centerOffsetX = 0;   // Merkezde tut (varsayılan)
const centerOffsetX = 50;  // Sağa 50px kaydır
```

#### **Y Ekseni (Dikey) Kaydırma:**
```javascript
const centerOffsetY = -50; // Yukarı 50px kaydır
const centerOffsetY = 0;   // Merkezde tut (varsayılan)
const centerOffsetY = 50;  // Aşağı 50px kaydır
```

### **2. Papatya Boyutu (Radius)**

#### **Küçük Papatya:**
```javascript
const radius = 50;  // Yapraklar merkeze yakın
```

#### **Orta Papatya (Varsayılan):**
```javascript
const radius = 80;  // Şu anki boyut
```

#### **Büyük Papatya:**
```javascript
const radius = 120; // Yapraklar merkeze uzak
```

#### **Çok Büyük Papatya:**
```javascript
const radius = 150; // Ekranı kaplayan papatya
```

## 🎯 **Pratik Örnekler**

### **Örnek 1: Sola Kaydırılmış Büyük Papatya**
```javascript
const radius = 120;        // Büyük papatya
const centerOffsetX = -50; // Sola 50px
const centerOffsetY = 0;   // Dikey merkezde
```

### **Örnek 2: Sağ Alt Köşeye Kaydırılmış Küçük Papatya**
```javascript
const radius = 50;         // Küçük papatya
const centerOffsetX = 50;  // Sağa 50px
const centerOffsetY = 50;  // Aşağı 50px
```

### **Örnek 3: Yukarı Kaydırılmış Orta Boyut Papatya**
```javascript
const radius = 80;         // Orta boyut
const centerOffsetX = 0;   // Yatay merkezde
const centerOffsetY = -50; // Yukarı 50px
```

## 🔧 **Nasıl Değiştirilir?**

1. `papatya-animasyon/src/App.js` dosyasını açın
2. `createPetal` fonksiyonunda şu satırları bulun:
   ```javascript
   const radius = 80; // Yarıçap
   const centerOffsetX = 0; // X ekseni kaydırma
   const centerOffsetY = 0; // Y ekseni kaydırma
   ```
3. İstediğiniz değerleri yazın
4. Dosyayı kaydedin
5. Tarayıcıda sayfayı yenileyin

## 📐 **Matematiksel Formül**

Her yaprak pozisyonu şu formülle hesaplanır:

```javascript
const radian = (angle * Math.PI) / 180;
const x = Math.cos(radian) * radius + centerOffsetX;
const y = Math.sin(radian) * radius + centerOffsetY;
```

- `angle`: Yaprak açısı (0° - 360°)
- `radius`: Merkezden uzaklık
- `centerOffsetX/Y`: Merkez kaydırma miktarı

## 💡 **İpuçları**

- **Küçük değişiklikler** için 10-20px kullanın
- **Büyük değişiklikler** için 50-100px kullanın
- **Negatif değerler** ters yöne kaydırır
- **Radius değeri** çok büyük olursa yapraklar ekran dışına çıkabilir

## 🎨 **Görsel Efektler**

- **Merkez kaydırma**: Papatyayı farklı konumlara taşır
- **Radius değişimi**: Papatyayı büyütür/küçültür
- **Yuvarlak şekil**: Her zaman korunur
- **Animasyonlar**: Tüm pozisyonlarda çalışır
