import React from "react";
import ReactCompareImage from "react-compare-image";

function CompareImage({
  leftImage,
  rightImage,
  leftImageCss,
  rightImageCss,
  leftImageLabel,
  rightImageLabel,
}) {
  return (
    <div className="app__compare-compare-container">
      <ReactCompareImage
        leftImage={leftImage}
        rightImage={rightImage}
        leftImageCss={leftImageCss}
        rightImageCss={rightImageCss}
        leftImageLabel={leftImageLabel}
        rightImageLabel={rightImageLabel}
      />
    </div>
  );
}

export default CompareImage;
