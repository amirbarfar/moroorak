import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { ALL_TAGS, Tag } from "./types";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterTag: Tag | "همه";
  onFilterChange: (tag: Tag | "همه") => void;
}

export default function FilterBar({ search, onSearchChange, filterTag, onFilterChange }: FilterBarProps) {
  const t = useTranslations("learning.filter");

  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={t("placeholder")}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background pr-11 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {(["همه", ...ALL_TAGS] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterChange(tag as Tag | "همه")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              filterTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tag === "همه" ? t("all") : tag}
          </button>
        ))}
      </div>
    </div>
  );
}