import type { TooltipData } from './index';

export const tooltips: Record<string, TooltipData> = {
  header: {
    title: 'Nagłówek CV',
    dos: [
      'Użyj pełnego imienia i nazwiska',
      'Dodaj aktualny numer telefonu',
      'Podaj profesjonalny adres email',
      'Umieść link do LinkedIn i GitHub',
    ],
    donts: [
      'Nie dodawaj zdjęcia (chyba że wymagane)',
      'Nie używaj dziwnych fontów',
      'Nie podawaj adresu domowego',
      "Nie używaj emaili typu 'kochamjave@gmail.com'",
    ],
    tips: [
      'Email powinien zawierać imię i nazwisko',
      'LinkedIn URL można skrócić do linkedin.com/in/imienazwisko',
    ],
  },
  summary: {
    title: 'Podsumowanie zawodowe',
    dos: [
      'Napisz 2-3 zdania o swoim doświadczeniu',
      'Podkreśl kluczowe umiejętności',
      'Dostosuj do konkretnej oferty pracy',
      'Użyj słów kluczowych z ogłoszenia',
    ],
    donts: [
      'Nie pisz więcej niż 4 zdania',
      "Nie używaj ogólników jak 'ambitny'",
      'Nie kopiuj tego samego tekstu wszędzie',
      'Nie pisz w pierwszej osobie',
    ],
    tips: [
      'Zacznij od lat doświadczenia lub poziomu',
      'Skończ celem zawodowym lub wartością dla firmy',
    ],
  },
  experience: {
    title: 'Doświadczenie zawodowe',
    dos: [
      'Opisuj osiągnięcia, nie obowiązki',
      'Używaj liczb i konkretnych przykładów',
      'Wymień użyte technologie',
      'Podaj okres zatrudnienia (miesiąc/rok)',
    ],
    donts: [
      "Nie pisz 'Programowałem aplikacje'",
      'Nie wymieniaj wszystkich technologii',
      'Nie ukrywaj luk w CV',
      'Nie kłam w datach',
    ],
    tips: [
      "Format: 'Zbudowałem system X używając Y, co zwiększyło Z o 30%'",
      'Najnowsze doświadczenie na górze',
    ],
  },
  skills: {
    title: 'Umiejętności techniczne',
    dos: [
      'Podziel na kategorie (Frontend, Backend, etc.)',
      'Podaj poziom zaawansowania',
      'Wymień najważniejsze technologie',
      'Dostosuj do oferty pracy',
    ],
    donts: [
      'Nie wymieniaj wszystkiego co znasz',
      'Nie kłam w poziomach',
      'Nie dodawaj przestarzałych technologii',
      'Nie używaj gwiazdek do oceny',
    ],
    tips: [
      'Użyj: Zaawansowany (3+ lata), Średniozaawansowany (1-3 lata), Podstawowy (<1 rok)',
      'Maksymalnie 15-20 technologii',
    ],
  },
  education: {
    title: 'Wykształcenie',
    dos: [
      'Podaj nazwę uczelni i kierunek',
      'Dodaj lata studiów',
      'Wymień ważne projekty/specjalizacje',
      'Dodaj kursy i certyfikaty',
    ],
    donts: [
      'Nie podawaj ocen (chyba że bardzo dobre)',
      'Nie wymieniaj szkół podstawowych/średnich',
      'Nie dodawaj nieukończonych studiów bez wyjaśnienia',
      'Nie kłam w tytułach',
    ],
    tips: [
      'Jeśli jesteś samoukiem, podkreśl projekty i kursy',
      'Certyfikaty IT są często ważniejsze niż dyplom',
    ],
  },
  projects: {
    title: 'Projekty',
    dos: [
      'Opisz 2-3 najlepsze projekty',
      'Podaj cel i rezultat projektu',
      'Wymień użyte technologie',
      'Dodaj linki do demo i kodu',
    ],
    donts: [
      'Nie dodawaj projektów z tutoriali',
      'Nie opisuj projektów bez kodu',
      'Nie ukrywaj że to projekt osobisty',
      'Nie dodawaj niedziałających linków',
    ],
    tips: [
      'Pokaż różnorodność umiejętności',
      'Opisz wyzwania i jak je rozwiązałeś',
    ],
  },
};
