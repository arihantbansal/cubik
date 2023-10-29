import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div
      className="flex flex-row 
        items-center gap-3"
    >
      <div>
        <Image
          src={
            "https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/5f5c4183-040d-4ba7-07a1-bbd109d81500/public"
          }
          width={34}
          height={34}
          alt={"Squares Design System Logo"}
        />
      </div>
      <span className="text-[var(--color-fg-primary)] text-[18px] uppercase tracking-[2.4px] font-[600]">
        Squares
      </span>
    </div>
  );
};

export default Logo;
