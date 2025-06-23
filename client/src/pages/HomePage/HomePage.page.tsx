import { memo } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import { PostsSection } from '../../components/PostsSection';

export const HomePage = memo(() => {
  return (
    <>
      <HeroSection />
      <PostsSection />
    </>
  );
});

HomePage.displayName = 'HomePage';
