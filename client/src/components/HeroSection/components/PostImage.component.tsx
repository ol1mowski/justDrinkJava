import { memo } from 'react';

interface PostImageProps {
  imageUrl?: string | null;
  title: string;
}

export const PostImage = memo<PostImageProps>(({ imageUrl, title }) => {
  return (
    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLDivElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90">
            <div className="text-white text-6xl font-bold opacity-80">☕</div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90 flex items-center justify-center">
          <div className="text-white text-6xl font-bold opacity-80">☕</div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
});

PostImage.displayName = 'PostImage';
