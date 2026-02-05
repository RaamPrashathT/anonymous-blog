import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { 
    RadioGroup, 
    RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getTitles } from "@/lib/getTitles";
import { Search } from "lucide-react";

interface IncomingData {
  id: string;
  title: string;
  likes: number;
  dislikes: number;
}

export function SearchAndFilter() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [titles, setTitles] = useState<IncomingData[]>([]);
  const [open, setOpen] = useState<boolean>(false);

const [filterMethod, setFilterMethod] = useState("none");

  const router = useRouter();

  const sortData = (data: IncomingData[], method: string) => {
    switch (method) {
      case "mostLiked":
        return [...data].sort((a, b) => b.likes - a.likes);
      case "mostDisliked":
        return [...data].sort((a, b) => b.dislikes - a.dislikes);
      default:
        return data;
    }
  };

  useEffect(() => {
    const getTitleArray = async () => {
      if (!debouncedSearch) {
        setTitles([]);
        return;
      }

      const data = await getTitles();
      let processed = data.filter((t) =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );

      processed = sortData(processed, filterMethod);

      setTitles(processed);
      if (processed.length > 0) setOpen(true);
    };
    void getTitleArray();
  }, [debouncedSearch, filterMethod]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            router.push(`/search?keyword=${debouncedSearch}&filter=${filterMethod}`);
            setOpen(false);
        }
    };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <InputGroup className="rounded-2xl">
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              tabIndex={0} 
            onKeyDown={handleKeyDown}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </PopoverTrigger>

        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-64 p-0 flex flex-col scrollbar-hide  sm:w-xl sm:flex-row"
          align="end"
        >
          <div className="flex-1 p-2 sm:w-96">
            {titles.length > 0 ?
            <ul className="max-h-64 overflow-y-auto scrollbar-hide ">
              {titles.map((listElement) => (
                <button
                  key={listElement.id}
                  className="hover:bg-slate-100 rounded-lg p-2 text-start w-full transition-colors"
                  onClick={() => {
                    setOpen(false);
                    router.push(`/blog/${listElement.id}`);
                  }}
                >
                  {listElement.title}
                </button>
              ))}
            </ul>
            :
            <div className="h-full w-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    {search.length  ? "No results found." : "Start typing to search."}
                </p>
            </div>
            }   
          </div>

          <div className="w-full sm:w-48 border-l border-gray-200 p-4 ">
            <h2 className="font-semibold mb-4">Filters</h2>

            <div className="space-y-4">
              <div>
                <RadioGroup value={filterMethod} onValueChange={setFilterMethod}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mostLiked" id="mostLikedRadio" />
                    <Label htmlFor="mostLikedRadio" className="text-sm">
                      Most Liked
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mostDisliked" id="mostDislikedRadio" />
                    <Label htmlFor="mostDislikedRadio" className="text-sm">
                      Most Disliked
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="none" id="noneRadio" />
                    <Label htmlFor="noneRadio" className="text-sm">
                      None
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

    
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
