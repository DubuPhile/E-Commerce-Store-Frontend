import { useEffect, useState,useRef } from "react";
import '../Styles/ImageSlider.css'

const ImageSlider = () => {
  const images = [
    "/images/slider/Chisa.jpg",
    "/images/slider/Dahyun.jpg",
    "/images/slider/Dahyun1.jpg",
    "/images/slider/Dahyun2.jpg",
  ];

  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const handleStart = e => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

    const handleEnd = e => {
        if (!isDragging.current) return;

        const endX = e.changedTouches
        ? e.changedTouches[0].clientX
        : e.clientX;

        const diff = startX.current - endX;

        if (diff > 50) {
        // swipe left
        setIndex(i => (i + 1) % images.length);
        } else if (diff < -50) {
        // swipe right
        setIndex(i => (i - 1 + images.length) % images.length);
        }

        isDragging.current = false;
    }
  return (
    <div 
        className="slider"
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
    >
        <img src={images[index]} alt="slider" />
        <div className="dots">
            {images.map((_, i) => (
                <span key={i} className={i === index ? "active" : ""} />
            ))}
        </div>
    </div>
    
  );
};

export default ImageSlider;