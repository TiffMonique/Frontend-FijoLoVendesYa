import React, { useRef, useState } from "react";
// Import Swiper React components
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectCube,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageSliderHome() {
  return (
    <>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        className="mySwiper"
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectCube,
        ]}
        //spaceBetween={1}
        //slidesPerView={5}

        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img id="imgropa" src="/images/ropa.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img id="imgpets" src="/images/pets.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img id="imgfruts" src="/images/fruts.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img id="imgproducts" src="/images/products.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
