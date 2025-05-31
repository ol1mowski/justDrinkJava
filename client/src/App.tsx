import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-java-light-gray">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-java-gray mb-4">
            Witaj w JustDrinkJava!
          </h1>
          <p className="text-lg text-java-gray/70 mb-8">
            Twoje źródło wiedzy o programowaniu w Javie
          </p>
          <div className="bg-java-white rounded-lg shadow-lg p-8">
            <p className="text-java-gray">
              Header został utworzony! 🎉
              <br />
              Teraz możesz zatwierdzić design i przejdziemy do Hero sekcji.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
