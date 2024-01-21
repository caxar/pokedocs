import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="5" rx="100" ry="100" width="290" height="290" />
  </ContentLoader>
);

export default SkeletonLoader;
