import { memo } from 'react';
import { SearchPage as SearchPageComponent } from '../../components/SearchPage/SearchPage.component';

export const SearchPage = memo(() => {
  return <SearchPageComponent />;
});

SearchPage.displayName = 'SearchPage';
