import { memo, useState } from 'react';
import { SearchInput } from './components/SearchInput.component';
import { FilterButton } from './components/FilterButton.component';
import { SortSelect } from './components/SortSelect.component';
import { FilterStats } from './components/FilterStats.component';
import { FilterPanel } from './components/FilterPanel.component';
import type { FilterOptions, SortOption } from './types';

interface PostsFilterProps {
  filters: FilterOptions;
  sortBy: SortOption;
  categories: Array<{ id: number; name: string }>;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
}

export const PostsFilter = memo<PostsFilterProps>(
  ({
    filters,
    sortBy,
    categories,
    onFiltersChange,
    onSortChange,
    resultsCount,
  }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

    const handleSearchChange = (value: string) => {
      setSearchQuery(value);
      onFiltersChange({ searchQuery: value });
    };

    const clearAllFilters = () => {
      setSearchQuery('');
      onFiltersChange({
        searchQuery: '',
        category: undefined,
      });
    };

    const activeFiltersCount = filters.category ? 1 : 0;

    return (
      <div className="sticky top-0 z-20 bg-java-white/80 dark:bg-java-dark-bg/80 backdrop-blur-lg border-b border-java-light-gray/20 dark:border-java-dark-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <SearchInput value={searchQuery} onChange={handleSearchChange} />

            <div className="flex items-center gap-3">
              <FilterButton
                activeCount={activeFiltersCount}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              />

              <SortSelect value={sortBy} onChange={onSortChange} />
            </div>
          </div>

          <FilterStats
            resultsCount={resultsCount}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearAllFilters}
          />

          {isFilterOpen && (
            <FilterPanel
              filters={filters}
              categories={categories}
              onFiltersChange={onFiltersChange}
            />
          )}
        </div>
      </div>
    );
  }
);

PostsFilter.displayName = 'PostsFilter';
