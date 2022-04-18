import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function GalleryProduct(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwipers"
      >
        {props.fotos.map((foto) => {
          return (
            <SwiperSlide>
              <img
                src={`http://localhost:4000/uploads/${foto}`}
                alt="product"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="myswiper"
      >
        {props.fotos.map((foto) => {
          return (
            <SwiperSlide>
              <img
                src={`http://localhost:4000/uploads/${foto}`}
                alt="product"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
