import { memo } from 'react';
import { useAuth } from '../../../hooks/auth';
import { CareerTipsLoginPrompt } from './CareerTipsLoginPrompt.component';

export const JavaCareerTips = memo(() => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 bg-gray-50 dark:bg-java-dark-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-java-gray dark:text-java-dark-text mb-4">
            Jak znaleźć pierwszą pracę jako Java Developer?
          </h2>
          <p className="text-lg text-gray-600 dark:text-java-dark-text-secondary max-w-3xl mx-auto">
            Praktyczne porady od doświadczonych programistów, które pomogą Ci
            zdobyć wymarzoną pozycję w IT
          </p>
        </div>

        {!isAuthenticated ? (
          <CareerTipsLoginPrompt />
        ) : (
          <div className="bg-white dark:bg-java-dark-bg rounded-xl p-8 shadow-lg border border-gray-200 dark:border-java-dark-border">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h3 className="text-2xl font-semibold text-java-gray dark:text-java-dark-text mb-4 border-b border-gray-200 dark:border-java-dark-border pb-2">
                1. Zbuduj solidne portfolio projektów
              </h3>
              <p className="text-gray-600 dark:text-java-dark-text-secondary mb-8 leading-loose">
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Portfolio to Twoja wizytówka
                </span>{' '}
                jako programista. Stwórz{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  3-5 projektów
                </span>
                , które pokażą różne aspekty programowania w Java.
                <br />
                <br />
                Każdy projekt powinien demonstrować inne umiejętności -{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  REST API, integrację z bazą danych, Spring Boot
                </span>
                , obsługę błędów.
                <br />
                <br />
                Umieść kod na{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  GitHub z dobrymi README
                </span>
                , które wyjaśniają co robi aplikacja, jak ją uruchomić i jakie
                technologie użyłeś.
              </p>

              <h3 className="text-2xl font-semibold text-java-gray dark:text-java-dark-text mb-4 border-b border-gray-200 dark:border-java-dark-border pb-2">
                2. Opanuj podstawy Java do perfekcji
              </h3>
              <p className="text-gray-600 dark:text-java-dark-text-secondary mb-8 leading-loose">
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Solidne fundamenty to klucz do sukcesu
                </span>
                . Musisz doskonale znać{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  programowanie obiektowe (OOP)
                </span>
                , kolekcje, obsługę wyjątków i wielowątkowość.
                <br />
                <br />
                Zrozum jak działa{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  JVM i garbage collection
                </span>{' '}
                - to często pojawia się na rozmowach kwalifikacyjnych.
                <br />
                <br />
                Poświęć czas na naukę{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  wzorców projektowych
                </span>
                , szczególnie Singleton, Factory i Observer.
              </p>

              <h3 className="text-2xl font-semibold text-java-gray dark:text-java-dark-text mb-4 border-b border-gray-200 dark:border-java-dark-border pb-2">
                3. Naucz się Spring Framework
              </h3>
              <p className="text-gray-600 dark:text-java-dark-text-secondary mb-8 leading-loose">
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Spring to absolutny must-have
                </span>{' '}
                w świecie Java. Zacznij od{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Spring Boot
                </span>{' '}
                - ułatwi Ci tworzenie aplikacji.
                <br />
                <br />
                Poznaj{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Spring MVC do budowania REST API
                </span>{' '}
                i{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Spring Data JPA
                </span>{' '}
                do pracy z bazami danych.
                <br />
                <br />
                Jeśli chcesz się wyróżnić, dodaj{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Spring Security
                </span>{' '}
                do swoich projektów - pokażesz, że rozumiesz bezpieczeństwo
                aplikacji.
              </p>

              <h3 className="text-2xl font-semibold text-java-gray dark:text-java-dark-text mb-4 border-b border-gray-200 dark:border-java-dark-border pb-2">
                4. Poznaj bazy danych
              </h3>
              <p className="text-gray-600 dark:text-java-dark-text-secondary mb-8 leading-loose">
                Każda aplikacja potrzebuje danych. Naucz się{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  SQL i poznaj relacyjne bazy danych
                </span>{' '}
                jak PostgreSQL lub MySQL.
                <br />
                <br />
                Zrozum{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  relacje między tabelami, indeksy i podstawy optymalizacji
                  zapytań
                </span>
                .
                <br />
                <br />
                Warto też poznać podstawy{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  NoSQL (MongoDB)
                </span>{' '}
                - pokazuje to, że jesteś otwarty na różne technologie.
              </p>

              <h3 className="text-2xl font-semibold text-java-gray dark:text-java-dark-text mb-4 border-b border-gray-200 dark:border-java-dark-border pb-2">
                5. Opanuj narzędzia developera
              </h3>
              <p className="text-gray-600 dark:text-java-dark-text-secondary mb-8 leading-loose">
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Git to absolutna podstawa
                </span>{' '}
                - bez tego nie dostaniesz pracy. Naucz się{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Maven lub Gradle
                </span>{' '}
                do zarządzania zależnościami.
                <br />
                <br />
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Docker
                </span>{' '}
                przyda się do konteneryzacji aplikacji. Poznaj podstawy{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Linux/Unix
                </span>{' '}
                - większość serwerów działa na tych systemach.
                <br />
                <br />
                Jako IDE wybierz{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  IntelliJ IDEA
                </span>{' '}
                (preferowane) lub Eclipse.
              </p>

              <h3 className="text-2xl font-semibold text-java-gray dark:text-java-dark-text mb-4 border-b border-gray-200 dark:border-java-dark-border pb-2">
                6. Buduj sieć kontaktów
              </h3>
              <p className="text-gray-600 dark:text-java-dark-text-secondary mb-8 leading-loose">
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Networking to potężne narzędzie
                </span>{' '}
                w poszukiwaniu pracy. Uczestnik w{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  meetupach Java, konferencjach technologicznych
                </span>
                , dołącz do grup na{' '}
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  LinkedIn i Discord
                </span>
                .
                <br />
                <br />
                Często oferty pracy pojawiają się w społecznościach zanim trafią
                na portale z ogłoszeniami.
                <br />
                <br />
                <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                  Bądź aktywny, zadawaj pytania, pomagaj innym
                </span>{' '}
                - to buduje Twoją reputację w branży.
              </p>

              <div className="mt-8 p-6 bg-java-orange/10 border-l-4 border-java-orange rounded-r-lg">
                <h4 className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-3">
                  💡 Kluczowe wskazówki
                </h4>
                <ul className="text-gray-600 dark:text-java-dark-text-secondary space-y-3">
                  <li className="leading-relaxed">
                    •{' '}
                    <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                      Zacznij od małych projektów
                    </span>{' '}
                    i stopniowo zwiększaj ich złożoność
                  </li>
                  <li className="leading-relaxed">
                    •{' '}
                    <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                      Każdy ekspert był kiedyś początkującym
                    </span>{' '}
                    - kluczem jest konsekwencja
                  </li>
                  <li className="leading-relaxed">
                    •{' '}
                    <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                      Ciągłe uczenie się i praktyka
                    </span>{' '}
                    to podstawa sukcesu
                  </li>
                  <li className="leading-relaxed">
                    •{' '}
                    <span className="bg-java-orange text-white px-2 py-1 rounded font-medium">
                      Nie bój się aplikować
                    </span>{' '}
                    - nawet jeśli nie spełniasz wszystkich wymagań
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

JavaCareerTips.displayName = 'JavaCareerTips';
