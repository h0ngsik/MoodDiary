"use client";

import Image from "next/image";

export const Banner = () => {
  return (
    <div className="w-full max-w-[1168px] min-w-[320px] mx-auto px-5">
      <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden">
        <Image
          src="/assets/images/banner_image1.png"
          alt="배너 이미지"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
