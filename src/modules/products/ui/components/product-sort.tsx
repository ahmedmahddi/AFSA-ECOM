"use client"

import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-products-filters"
import { cn } from "@/lib/utils";



export const ProductSort = () => {
    const [filters, setFilters] = useProductFilters();
    return (
        <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm"
                className={cn("rounded-full bg-white hover:bg-white",
                    filters.sort !== "curated" && "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                onClick={() => setFilters({ sort: "curated" })}
            >
                Curated
            </Button>
            <Button variant="secondary" size="sm"
                className={cn("rounded-full bg-white hover:bg-white",
                    filters.sort !== "trending" && "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                onClick={() => setFilters({ sort: "trending" })}
            >
                Trending
            </Button>
            <Button variant="secondary" size="sm"
                className={cn("rounded-full bg-white hover:bg-white",
                    filters.sort !== "hot_and_new" && "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                onClick={() => setFilters({ sort: "hot_and_new" })}
            >
                Hot & New
            </Button>
        </div>
    )
}