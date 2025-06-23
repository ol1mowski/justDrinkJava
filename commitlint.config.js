module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // nowa funkcjonalność
        'fix', // naprawa błędu
        'refactor', // refaktoryzacja kodu
        'docs', // dokumentacja
        'style', // formatowanie, brakujące średniki, itp.
        'test', // dodanie testów
        'chore', // zadania konserwacyjne
        'perf', // poprawa wydajności
        'ci', // continuous integration
        'build', // system budowania
        'revert', // cofnięcie zmian
      ],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
  },
};
