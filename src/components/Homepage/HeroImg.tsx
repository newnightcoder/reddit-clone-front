import React from "react";
import { heroImg } from "../../assets";

const HeroImg = () => {
  return (
    <div className="hero-img hidden h-full w-[60%] z-50 md:flex items-center justify-center md:justify-end pt-8 2xl:pt-14">
      <img src={heroImg} alt="forum mockup on laptop and mobile phone" className="w-full max-w-[1200px]" />
    </div>
  );
};

export default HeroImg;
