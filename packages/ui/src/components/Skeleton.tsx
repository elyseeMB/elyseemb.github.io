import React from "preact/compat";

export const Skeleton = () => {
  return (
    <div className="skeleton-loading">
      <div className="skeleton-shimmer" />
    </div>
  );
};

export const SkeletonGallery = ({ length = 6 }: { length: number }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length }, (_, k) => (
        <div className="skeleton-item">
          <Skeleton />
        </div>
      ))}
    </div>
  );
};
