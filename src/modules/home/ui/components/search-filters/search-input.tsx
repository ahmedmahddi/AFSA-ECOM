"use client";
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";


interface Props {
    disabled?: boolean;
    defaultValue?: string | undefined;
    onChange?: (value: string) => void;

}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions())

    const [searchInput, setSearchInput] = useState(defaultValue || "");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        onChange?.(value);
    };


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
                    onChange={handleInputChange}
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

export const SearchInputSkeleton = () => {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative w-full">
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="size-12 shrink-0 flex lg:hidden" />
            <Skeleton className="h-10 w-24 hidden sm:flex" />
        </div>
    )
}

