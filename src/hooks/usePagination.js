import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function usePagination(
  data,
  itemsPerPage = 10,
  scrollRef = null,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    if (pageParam > totalPages && totalPages > 0) {
      setSearchParams({ page: 1 });
    }
  }, [data, pageParam, setSearchParams, totalPages]);

  const startIndex = (pageParam - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const changePage = (_, value) => {
    setSearchParams({ page: value });
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
