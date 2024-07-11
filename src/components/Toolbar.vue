<template>
  <div class="toolbar">
    <nav>
      <router-link to="/" class="logo">
        <span class="logo-text">78 Online</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/products" class="nav-item">Products</router-link>
      </div>
    </nav>
    <div class="image-gallery">
      <div class="image-track">
        <div v-for="(image, index) in images" :key="index" class="gallery-item">
          <img
            :src="image.src"
            :alt="'Image ' + (index + 1)"
            class="gallery-image"
          />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppToolbar',
  data() {
    return {
      images: [
        { src: require('@/assets/img1.png') },
        { src: require('@/assets/img2.jpg') },
        { src: require('@/assets/img3.jpg') },
        { src: require('@/assets/img4.jpg') },
        { src: require('@/assets/img5.webp') },
        { src: require('@/assets/img6.webp') },
        { src: require('@/assets/img7.png') },
      ],
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.toolbar {
  font-family: 'Poppins', sans-serif;
  background: #f0f4f8;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  box-shadow: 0 4px 20px rgba(0, 114, 255, 0.2);
  position: relative;
  overflow: hidden;
}

nav::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 40%);
  transform: rotate(30deg);
  animation: shineEffect 8s linear infinite;
}

@keyframes shineEffect {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.logo {
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  position: relative;
  z-index: 1;
}

.logo-text {
  display: inline-block;
  background: linear-gradient(45deg, #fff, #f0f4f8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colorShift 5s ease-in-out infinite;
}

@keyframes colorShift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(30deg); }
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  z-index: 1;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: all 0.4s ease;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.image-gallery {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 2rem;
  background: linear-gradient(to right, #f0f4f8, #ffffff, #f0f4f8);
}

.image-track {
  display: flex;
  width: fit-content;
  animation: slideCircular 30s linear infinite;
}

.gallery-item {
  flex: 0 0 auto;
  margin-right: 2rem;
  perspective: 1000px;
}

.gallery-image {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 15px;
  transition: all 0.5s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: rotateY(20deg);
}

.gallery-item:hover .gallery-image {
  transform: rotateY(0deg) scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

@keyframes slideCircular {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 2));
  }
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    padding: 1rem;
  }
  
  .logo {
    margin-bottom: 1rem;
  }
  
  .nav-links {
    flex-direction: column;
    width: 100%;
  }
  
  .nav-item {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .image-gallery {
    height: 150px;
  }
  
  .gallery-image {
    width: 130px;
    height: 130px;
  }
}
</style>