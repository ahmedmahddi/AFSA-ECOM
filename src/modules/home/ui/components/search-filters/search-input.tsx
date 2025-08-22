"use client";
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useProductFilters } from "@/modules/products/hooks/use-products-filters";
import { useDebounce } from "@/hooks/use-debounce";

interface Props {
    disabled?: boolean;

}

export const SearchInput = ({ disabled }: Props) => {
    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions())

    const [filers, setFilters] = useProductFilters();
    const [searchInput, setSearchInput] = useState(filers.search);
    const debouncedSearch = useDebounce(searchInput, 300);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Update the URL params when debounced search changes
    useEffect(() => {
        setFilters({ search: debouncedSearch });
    }, [debouncedSearch, setFilters]);
    
    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input
                    className="pl-8"
                    placeholder="Search products"
                    disabled={disabled}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <Button variant="elevated" className="size-12 shrink-0 flex lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                <ListFilterIcon />
            </Button>

            {session.data?.user && (
                <Button asChild variant="elevated">
                    <Link prefetch href="/library">
                        <BookmarkCheckIcon className="mr-2" />
                        Library
                    </Link>
                </Button>
            )}

        </div>
    )
} 