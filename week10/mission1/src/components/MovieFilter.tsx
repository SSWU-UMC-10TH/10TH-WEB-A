import type { MovieLanguage, MovieFilters } from "../types/movie"
import { useState, useCallback, memo } from "react";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
    onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) =>  {
    const [query, setQuery] = useState<string>("")
    const [includeAdult, setIncludeAdult] = useState<boolean>(false)
    const [language, setLanguage] = useState<MovieLanguage>("ko-KR")

    const handleSubmit = useCallback(() => {
        const filters: MovieFilters = {
            query,
            include_adult: includeAdult,
            language,
        }
        onChange(filters)
    }, [query, includeAdult, language, onChange])

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6
    shadow-md transition-all hover:shadow-xl">
        <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-75 flex-1">
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="query">
                    영화 제목
                </label>
                <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <Input value={query} onChange={setQuery} />
                </div>
            </div>
            <div className="min-w-45 flex-1">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    언어
                </label>
                <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <LanguageSelector
                        value={language}
                        onChange={(value) => setLanguage(value as MovieLanguage)}
                        options={LANGUAGE_OPTIONS}
                    />
                </div>
            </div>
            <div className="min-w-40 flex-1">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    성인 콘텐츠
                </label>
                <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2.5">
                    <SelectBox
                        checked={includeAdult}
                        onChange={setIncludeAdult}
                        id="include_adult"
                        label="포함"
                    />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold
                text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
                검색
            </button>
        </div>
    </div>
  )
}

export default memo(MovieFilter)