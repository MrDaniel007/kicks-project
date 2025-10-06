import React, {useState, useEffect} from 'react'
import "./Banner.scss"
import shoes from "../../assets/image/shoes.png"

function Banner() {
const images = [
  {
    main: "/src/assets/image/banner1.avif",
    thumbs: ["/src/assets/image/banner2.jpg", "/src/assets/image/banner3.webp"],
  },
  {
    main: "/src/assets/image/banner2.jpg",
    thumbs: ["/src/assets/image/banner1.avif", "/src/assets/image/banner3.webp"],
  },
  {
    main: "/src/assets/image/banner3.webp",
    thumbs: ["/src/assets/image/banner1.avif", "/src/assets/image/banner2.jpg"],
  },
];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Автосмена каждые 7 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Клик по превьюшке
  const handleClick = (thumbSrc) => {
    const newIndex = images.findIndex((img) => img.main === thumbSrc);
    if (newIndex !== -1) {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setFade(true);
      }, 300);
    }
  };

  const { main, thumbs } = images[currentIndex];


  return (
    <div data-aos="fade-up"
     data-aos-anchor-placement="top-bottom"
     data-aos-duration="1500">
      <div  data-aos="fade-left" data-aos-delay="400" className='big-words'>Do it <span className='right'>right</span></div>
    {/* <div data-aos="fade-right" data-aos-delay="600" className='banner-img'> <img className='banner-shoes' src={shoes} alt="" /></div>  */}

     <div className="banner-container" >
      <img
        src={main}
        alt="Main sneaker"
        className={`main-banner ${fade ? "fade" : ""}`}
      />

      <div className="thumbnails">
      
        {thumbs.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`Thumbnail ${index + 1}`}
            className="thumb"
            onClick={() => handleClick(thumb)}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Banner
