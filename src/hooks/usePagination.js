import { useSearchParams } from "react-router-dom";

export default function usePagination(data, itemsPerPage = 10) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (pageParam - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const changePage = (_, value) => {
    setSearchParams({ page: value });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    page: pageParam,
    totalPages,
    currentData,
    changePage,
  };
}
