import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'

const App = () => {

  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg 
                   text-java-gray dark:text-java-dark-text transition-colors duration-300">
      <Header />
      <HeroSection />
    </div>
  )
}

export default App
