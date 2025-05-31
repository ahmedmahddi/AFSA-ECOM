import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface Props {
    data: any; // Adjust the type as needed
}


export const SearchFilters = ({ data }: Props) => {
    return (
        <div className="px-4 lg:px-12 py-8 gap-4 border-b flex flex-col w-full">
            <SearchInput />
            <Categories data={data} />
            {/* TODO : ADD Categories view all button  */}
            {/* TODO : ADD Library button  */}

        </div>
    )
}