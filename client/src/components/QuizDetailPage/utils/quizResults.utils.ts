export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

export const getScoreMessage = (score: number): string => {
  if (score >= 90) return "Doskonały wynik! 🏆";
  if (score >= 80) return "Bardzo dobry wynik! 🎉";
  if (score >= 70) return "Dobry wynik! 👍";
  if (score >= 60) return "Wynik zadowalający 📚";
  return "Warto jeszcze poćwiczyć 💪";
};

export const getStars = (score: number): number => {
  if (score >= 90) return 5;
  if (score >= 80) return 4;
  if (score >= 70) return 3;
  if (score >= 60) return 2;
  return 1;
}; 