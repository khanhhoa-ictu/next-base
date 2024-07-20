import React from "react";
import Image from "next/image";
import noData from "assets/images/nodata.png";

function NoData() {
  return <Image src={noData} alt="no-data" className="translate-y-1/2 translate-x-1/2 absolute top-[50%] left-[50%]" />;
}

export default NoData;