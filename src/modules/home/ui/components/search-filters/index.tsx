"use client";

import { useTRPC } from "@/trpc/client";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constans";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { useProductFilters } from "@/modules/products/hooks/use-products-filters";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchFilters = () => {
  const [filters, setFilters] = useProductFilters();
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update filters when debounced search changes
  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch, setFilters]);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryParam = (params.category as string) || undefined;
  const activeCategory = categoryParam || "all";



  const activeCategoryData = data.find(
    category => category.slug === activeCategory
  );
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = (params.subcategory as string) || undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find(
      subcategory => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-12 pb-8 pt-25 gap-4 border-b flex flex-col w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput defaultValue={searchInput} onChange={setSearchInput} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 gap-4 border-b flex flex-col w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
