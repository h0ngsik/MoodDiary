"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePhotoStore } from "@/stores/photoStore";
import Image from "next/image";

export const PhotoGallery = () => {
  const { photos, isLoading, hasMore, fetchPhotos, fetchMorePhotos } =
    usePhotoStore();
  const observerRef = useRef<IntersectionObserver>();
  const lastPhotoRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 설정
  const lastPhotoCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMorePhotos();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore, fetchMorePhotos]
  );

  // 초기 데이터 로딩
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  if (!photos.length && !isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16">
        <p className="text-lg text-gray-500">아직 등록된 사진이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          ref={index === photos.length - 1 ? lastPhotoCallback : null}
          className="w-[480px] h-[480px] relative rounded-3xl overflow-hidden"
        >
          <Image
            src={photo.url}
            alt={`Photo ${index + 1}`}
            fill
            className="object-cover"
            sizes="480px"
          />
        </div>
      ))}
      {isLoading && (
        <div className="w-full flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      )}
    </div>
  );
};
