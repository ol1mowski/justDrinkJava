export interface CareerTip {
  id: number
  title: string
  description: string
  icon: string
}

export const careerTips: CareerTip[] = [
  {
    id: 1,
    title: "Zbuduj solidne portfolio projektów",
    description: "Stwórz 3-5 projektów demonstrujących różne technologie. Umieść je na GitHub i hostuj online.",
    icon: "🚀"
  },
  {
    id: 2,
    title: "Naucz się podstaw algorytmów i struktur danych",
    description: "Praktykuj zadania na LeetCode, HackerRank czy Codewars. To podstawa większości rozmów technicznych.",
    icon: "🧠"
  },
  {
    id: 3,
    title: "Przygotuj się do rozmów behawioralnych",
    description: "Przygotuj przykłady sytuacji używając metody STAR (Situation, Task, Action, Result).",
    icon: "💬"
  },
  {
    id: 4,
    title: "Stwórz profesjonalny profil LinkedIn",
    description: "Optymalizuj profil pod kątem rekruterów. Dodaj zdjęcie, opis, umiejętności i rekomendacje.",
    icon: "👔"
  },
  {
    id: 5,
    title: "Ucz się technologii używanych w firmach",
    description: "Sprawdź oferty pracy i naucz się najpopularniejszych technologii w Twojej branży.",
    icon: "💻"
  },
  {
    id: 6,
    title: "Bierz udział w projektach open source",
    description: "Przyczyniaj się do projektów open source - to świetny sposób na zdobycie doświadczenia.",
    icon: "🌟"
  },
  {
    id: 7,
    title: "Networking i społeczność IT",
    description: "Uczesticz w meetupach, konferencjach i wydarzeniach IT. Buduj relacje w branży.",
    icon: "🤝"
  },
  {
    id: 8,
    title: "Przygotuj się do zadań praktycznych",
    description: "Ćwicz live coding, pair programming i rozwiązywanie problemów pod presją czasu.",
    icon: "⚡"
  },
  {
    id: 9,
    title: "Zdobądź certyfikaty branżowe",
    description: "Zdobądź certyfikaty AWS, Azure, Google Cloud lub inne releventne dla Twojej ścieżki.",
    icon: "🏆"
  },
  {
    id: 10,
    title: "Nie poddawaj się po odrzuceniu",
    description: "Każde 'nie' przybliża Cię do 'tak'. Ucz się na błędach i aplikuj dalej!",
    icon: "💪"
  }
] 