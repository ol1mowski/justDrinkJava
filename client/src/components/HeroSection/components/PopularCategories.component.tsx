import { memo } from 'react';
import { useCategories } from '../hooks/useCategories.hook';
import { ErrorBoundaryWrapper } from '../../ui';
import { CategoriesLoadingState } from './CategoriesLoadingState.component';
import { CategoriesErrorState } from './CategoriesErrorState.component';
import { PopularCategoriesHeader } from './PopularCategoriesHeader.component';
import { CategoriesList } from './CategoriesList.component';

export const PopularCategories = memo(() => {
  const { tags, loading, error, refetch } = useCategories(10);

  if (loading) {
    return <CategoriesLoadingState itemsCount={10} />;
  }

  if (error) {
    return <CategoriesErrorState error={error} onRetry={refetch} />;
  }

  return (
    <ErrorBoundaryWrapper
      title="Błąd komponentu kategorii"
      message="Wystąpił problem podczas wyświetlania popularnych kategorii"
    >
      <div
        className="bg-java-white rounded-2xl p-6 sm:p-8 
                     border border-java-gray/10"
      >
        <PopularCategoriesHeader />
        <CategoriesList tags={tags} />
      </div>
    </ErrorBoundaryWrapper>
  );
});

PopularCategories.displayName = 'PopularCategories';
