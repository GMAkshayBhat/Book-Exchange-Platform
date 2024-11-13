// Carousel.js
import React, { useState, useEffect } from 'react';
import '../assets/styles/Carousel.css'; // Import Auth.css
import youCanWin from '../assets/images/youCanWin.webp';
import FSAurelia from '../assets/images/FSAurelia.jpg';
import FsFrank from '../assets/images/FsFrank.jpg';


const images = [
    youCanWin,
    FSAurelia,
    FsFrank
];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loops back to the first image
//     }, 3000); // Change image every 3 seconds (3000ms)

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="carousel-container">
//       <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />
//     </div>
//   );
// };

// export default Carousel;
const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Automatically change image every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image
      }, 3000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    // Next button click handler
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    // Previous button click handler
    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Loop to the last image
    };
  
    return (
      <div className="carousel-container">
        {/* Previous button */}
        <button className="arrow-button prev" onClick={prevImage}>&#10094;</button>
  
        {/* Carousel Image */}
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />
  
        {/* Next button */}
        <button className="arrow-button next" onClick={nextImage}>&#10095;</button>
      </div>
    );
  };
  
  export default Carousel;
