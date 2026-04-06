import { useSearchParams } from "react-router-dom";
import { useEffect, RefObject } from "react";

export default function usePagination<T>(
  data: T[],
  itemsPerPage: number = 10,
  scrollRef?: RefObject<HTMLDivElement | null>,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    if (pageParam > totalPages && totalPages > 0) {
      setSearchParams({ page: "1" });
    }
  }, [data, pageParam, setSearchParams, totalPages]);

  const startIndex = (pageParam - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData: T[] = data.slice(startIndex, endIndex);

  const changePage = (_: unknown, value: number) => {
    setSearchParams({ page: String(value) });

    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return {
    page: pageParam,
    totalPages,
    currentData,
    changePage,
  };
}
