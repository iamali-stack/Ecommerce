import React from 'react';
import img1 from '../../assets/images/slider-image-1.jpeg';
import img2 from '../../assets/images/slider-image-2.jpeg';
import img3 from '../../assets/images/slider-image-3.jpeg';
import img4 from '../../assets/images/grocery-banner-2.jpeg';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="w-full flex justify-center items-center"> {/* مركزي أفقيًا */}
      <div className="w-[90%] flex flex-wrap lg:flex-nowrap mx-auto">
        {/* Left Large Slider */}
        <div className="w-full lg:w-3/4">
          <Slider {...settings}>
            <img className="w-full h-[400px] sm:h-[350px] md:h-[400px] lg:h-[420px]" src={img3} alt="" />
            <img className="w-full h-[400px] sm:h-[350px] md:h-[400px] lg:h-[420px]" src={img4} alt="" />
          </Slider>
        </div>

        {/* Right Two Static Images */}
        <div className="w-full lg:w-1/4 flex flex-col">
          <img className="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[210px]" src={img1} alt="" />
          <img className="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[210px]" src={img2} alt="" />
        </div>
      </div>
    </div>
  );
}
