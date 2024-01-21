import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonProduct = () => (
  <ContentLoader
    speed={2}
    width={290}
    height={180}
    viewBox="0 0 290 180"
    backgroundColor="#f3f3f3"
  >
    <rect x="9" y="29" rx="10" ry="10" width="290" height="180" />
  </ContentLoader>
);

export default SkeletonProduct;
