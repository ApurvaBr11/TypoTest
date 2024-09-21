import React, { memo, useEffect, useRef } from 'react';
import './Slider.css'; // Ensure you have this CSS file

const cards = [
  { id: 1, type: 'video', src: '/asset/vid1.mp4' },
  { id: 2, type: 'image', src: '/asset/img1.jpg' },
  { id: 3, type: 'video', src: '/asset/vid2.mp4' },
  { id: 4, type: 'video', src: '/asset/vid3.mp4' },
  { id: 5, type: 'image', src: '/asset/img2.jpg' },
  { id: 6, type: 'video', src: '/asset/vid4.mp4' },
  { id: 7, type: 'video', src: '/asset/vid2.mp4' }
];

function Slider() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (slider.scrollTop >= slider.scrollHeight / 2 - slider.clientHeight) {
          slider.scrollTop = 0; // Reset to top
        } else {
          slider.scrollTop += 1; // Adjust speed as needed
        }
      }, 20); // Adjust speed as needed
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="slidermain pr-8" ref={sliderRef}>
      <div className="slider-content">
        {cards.map((card) => (
          <div className="slidercard" key={card.id}>
            {card.type === 'image' ? (
              <img className="slidercontent" src={card.src} alt={`Slide ${card.id}`} />
            ) : (
              <video className="slidercontent" autoPlay muted loop playsInline>
                <source src={card.src} type="video/mp4" />
                <track kind="captions" srcLang="en" src="path/to/captions.vtt" label="English" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
        {/* Duplicate cards for infinite effect */}
        {cards.map((card) => (
          <div className="slidercard p-2" key={`${card.id}-duplicate`}>
            {card.type === 'image' ? (
              <img className="slidercontent" src={card.src} alt={`Slide ${card.id}-duplicate`} />
            ) : (
              <video className="slidercontent" autoPlay muted loop playsInline>
                <source src={card.src} type="video/mp4" />
                <track kind="captions" srcLang="en" src="path/to/captions.vtt" label="English" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Slider);
