import type { CategoryTag } from '../components/HeroSection/hooks/useCategories.hook'

export const getTagStyles = (color: CategoryTag['color']) => {
  const styles = {
    orange: 'bg-java-orange/10 text-java-orange border-java-orange/20 hover:bg-java-orange hover:text-white',
    red: 'bg-java-red/10 text-java-red border-java-red/20 hover:bg-java-red hover:text-white',
    blue: 'bg-java-blue/10 text-java-blue border-java-blue/20 hover:bg-java-blue hover:text-white'
  }
  return styles[color]
} 