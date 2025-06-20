import { memo } from "react";
import { CategoryItem } from "./CategoryItem.component";
import type { CategoryTag } from "../hooks/useCategories.hook";

interface CategoriesListProps {
  tags: CategoryTag[];
}

export const CategoriesList = memo<CategoriesListProps>(({ tags }) => {
  return (
    <div className="space-y-4">
      {tags.map((tag, index) => (
        <CategoryItem key={tag.id} tag={tag} index={index} />
      ))}
    </div>
  );
});

CategoriesList.displayName = "CategoriesList";
