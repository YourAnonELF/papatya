// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / (documentHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // İlk yüklemede çalıştır
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createPetal = (index, totalPetals = 16) => {
    const angle = (index * 360) / totalPetals;
    const delay = index * 0.1;
    
    // Scroll progress'e göre yaprakların görünürlüğü ve boyutu
    const petalProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2));
    const opacity = petalProgress;
    const scale = Math.max(0.1, Math.min(1, petalProgress * 1.5));
    
    // 🌼 PAPATYA POZİSYONLAMA PARAMETRELERİ 🌼
    // Bu değerleri değiştirerek papatyayı istediğiniz yere taşıyabilirsiniz!
    
    // 📍 ÖRNEK KONFİGÜRASYONLAR:
    // 1. Sola kaydırma: centerOffsetX = -50
    // 2. Sağa kaydırma: centerOffsetX = 50  
    // 3. Yukarı kaydırma: centerOffsetY = -50
    // 4. Aşağı kaydırma: centerOffsetY = 50
    // 5. Büyük papatya: radius = 120
    // 6. Küçük papatya: radius = 50
    
    const radius = 60; // Yarıçap: Yaprakların merkezden uzaklığı (px)
    const centerOffsetX = -100; // X ekseni kaydırma: Sola 50px (örnek)
    const centerOffsetY = -130; // Y ekseni kaydırma: Dikey merkezde
    
    // Yaprak pozisyonu hesaplama - merkez etrafında daire şeklinde
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius + centerOffsetX;
    const y = Math.sin(radian) * radius + centerOffsetY;

    return (
      <div
        key={index}
        className="petal"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '32px',
          height: '64px',
          marginLeft: '-16px',
          marginTop: '-32px',
          transform: `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${scale})`,
          opacity: opacity,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'center bottom'
        }}
      >
        <div className="petal-shape" />
      </div>
    );
  };

  const createStreamParticle = (index) => {
    const delay = index * 0.2;
    const side = index % 4;
    let startX, startY, endX, endY;
    
    switch(side) {
      case 0: // Sol
        startX = -20;
        startY = Math.random() * 100 + 20;
        endX = 50;
        endY = 50;
        break;
      case 1: // Sağ
        startX = 120;
        startY = Math.random() * 100 + 20;
        endX = 50;
        endY = 50;
        break;
      case 2: // Üst
        startX = Math.random() * 100 + 10;
        startY = -20;
        endX = 50;
        endY = 50;
        break;
      default: // Alt
        startX = Math.random() * 100 + 10;
        startY = 120;
        endX = 50;
        endY = 50;
    }

    // Parçacıkların merkeze doğru hareketi
    //const particleProgress = Math.max(0, Math.min(1, scrollProgress * 4.3));
    
    const particleProgress = Math.max(0, Math.min(1, (scrollProgress - 0.3) * 2));
    const currentX = startX + (endX - startX) * particleProgress ;
    const currentY = startY + (endY - startY) * particleProgress ;
    
    // Parçacıklar scroll ilerledikçe kaybolur
    const opacity = particleProgress < 0.8 ? Math.max(0, 1 - particleProgress * 1.2) : 0;
    const scale = Math.max(0.3, 1 - particleProgress * 0.8);
    
    return (
      <div
        key={`particle-${index}`}
        className="particle"
        style={{
          position: 'absolute',
          left: `${currentX}%`,
          top: `${currentY}%`,
          width: '12px',
          height: '12px',
          opacity: opacity,
          transform: `scale(${scale})`,
          transition: 'all 0.3s ease-out',
          animationDelay: `${delay}s`
        }}
      />
    );
  };

  const createStream = (index) => {
    const angle = (index * 45) + 22.5; // 8 şerit, 45 derece aralıklarla
    const streamProgress = Math.max(0, Math.min(1, scrollProgress * 2));
    const length = Math.max(0, 150 - streamProgress * 150);
    //const opacity = streamProgress < 0.7 ? Math.max(0, 0.8 - streamProgress * 1.2) : 0;
    const opacity = 0;
    
    return (
      <div
        key={`stream-${index}`}
        className="stream"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '2px',
          height: `${length}px`,
          transform: `translateX(-50%) rotate(${angle}deg)`,
          opacity: opacity,
          marginTop: `-${length}px`,
          transition: 'all 0.4s ease-out'
        }}
      />
    );
  };

  // 🌟 ORTADAKİ RESİM FONKSİYONU 🌟
  // Bu fonksiyon ortada görünecek resmi oluşturur
  // Resim, akışkan şeritlerle aynı zamanda kaybolur
  const createCenterImage = () => {
    // streamProgress ile aynı mantığı kullanıyoruz
    // Böylece resim de çizgilerle beraber kaybolur
    const streamProgress = Math.max(0, Math.min(1, scrollProgress * 2));
    
    // Resmin opacity'si çizgilerle aynı şekilde hesaplanır
    // streamProgress < 0.7 olduğunda yavaş yavaş kaybolur
    const imageOpacity = streamProgress < 0.7 ? Math.max(0, 0.8 - streamProgress * 1.2) : 0;
    
    return (
      <div
        className="center-image"
        style={{
          position: 'absolute',
          left: '50%',           // Yatayda ortala
          top: '50%',            // Dikeyde ortala
          width: '350px',        // Resim genişliği
          height: '350px',       // Resim yüksekliği
          marginLeft: '-175px',   // Tam ortalamak için yarı genişlik kadar sola kaydır
          marginTop: '-175px',    // Tam ortalamak için yarı yükseklik kadar yukarı kaydır
          opacity: imageOpacity, // Çizgilerle aynı opacity
          zIndex: 100,            // Çizgilerin önünde görünür (z-index: 10'dan büyük)
          transition: 'all 0.4s ease-out', // Yumuşak geçiş efekti
          // Resim için ek stiller
          //backgroundImage: 'url("https://via.placeholder.com/100x100/FFD700/000000?text=🌟")', // Placeholder resim
          backgroundImage: 'url("/bebegim2.jpg")', // Kendi resminiz - / ile başlamalı
          // ALTERNATİF: Eğer resim src klasöründe ise:
          // 1. Dosyayı src klasörüne koyun
          // 2. Import edin: import bebegimImage from './bebegim.jpg';
          // 3. Bu satırı değiştirin: backgroundImage: `url(${bebegimImage})`
          //backgroundSize: 'cover',     // Resmi container'a sığdır
          backgroundSize: 'cover',       // Resmi container'ı kaplayacak şekilde büyüt - kenarları kırpılır
          backgroundPosition: 'center', // Resmi ortala
          borderRadius: '50%',         // Yuvarlak resim
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)' // Altın rengi glow efekti'
        }}
      />
    );
  };

  return (
    <div ref={containerRef} className="app-container">
      
      {/* Işık efekti */}
      <div className="light-effect" style={{ left: `${scrollProgress * 120 - 20}%` }} />

      {/* Ana animasyon alanı */}
      <div className="animation-container">
        <div className="daisy-wrapper">
          
          {/* Akışkan şeritler */}
          <div className="streams-container">
            {Array.from({ length: 8 }).map((_, i) => createStream(i))}
          </div>
          
          {/* 🌟 ORTADAKİ RESİM 🌟 */}
          {/* Bu resim çizgilerin önünde görünür ve onlarla beraber kaybolur */}
          {createCenterImage()}
          
          {/* Parçacık sistemi */}
          <div className="particles-container">
            {Array.from({ length: 20 }).map((_, i) => createStreamParticle(i))}
          </div>
          
          {/* Papatya merkezi */}
          <div 
            className="daisy-center"
            style={{
              opacity: Math.max(0, scrollProgress - 0.1),
              
              transform: `scale(${Math.max(0.5, Math.min(1.2, (scrollProgress - 0.1) * 1.5))})`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="center-detail-1" />
            <div className="center-detail-2" />
          </div>
          
          {/* Papatya yaprakları */}
          <div className="petals-container">
            {Array.from({ length: 16 }).map((_, i) => createPetal(i))}
          </div>
          
        </div>
        
        {/* İlerleme göstergesi */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
      
      {/* İçerik bölümleri */}
      <div className="content-sections">
        <div className="content-section">
          <div className="content-inner">
            <h1 className="main-title">Aşağı Kaydır</h1>
            <p className="main-subtitle">Büyülü dönüşümü izle</p>
            <div className="scroll-indicator">
              <svg className="scroll-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="content-section">
          <div className="content-inner">
            <h2 className="section-title">Parçalar Birleşiyor</h2>
            <p className="section-text">
              Her kaydırışınızda, etraftan gelen altın parçacıklar yavaş yavaş bir araya geliyor...
            </p>
          </div>
        </div>
        
        <div className="content-section">
          <div className="content-inner">
            <h2 className="section-title">Büyülü Dönüşüm</h2>
            <p className="section-text">
              Akışkan hareketler ve zarif animasyonlar eşliğinde, güzel bir papatya şekilleniyor.
            </p>
          </div>
        </div>
        
        <div className="content-section">
          <div className="content-inner">
            <h2 className={`final-title ${scrollProgress > 0.9 ? 'completed' : ''}`}>
              {scrollProgress > 0.9 ? "Tamamlandı!" : "Neredeyse Bitti..."}
            </h2>
            <p className="section-text">
              {scrollProgress > 0.9 
                ? "Işıltılı papatyanız hazır! Bu zarif çiçek artık size ait." 
                : "Son dokunuşlar yapılıyor, biraz daha kaydırın."
              }
            </p>
            {scrollProgress > 0.9 && (
              <div className="completion-icon">
                <span>🌼</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;