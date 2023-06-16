import { useState } from 'react';

function usePagination<T>(data: T[], itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const maxPage = Math.ceil(data.length / itemsPerPage);

	function currentData() {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return data.slice(start, end);
	}

	function next() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}

	function prev() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
	}

	function setPagePaginate(page: number) {
		const pageNumber = Math.max(1, page);
		setCurrentPage(() => Math.min(pageNumber, maxPage));
	}

	return { next, prev, setPagePaginate, currentData, currentPage, maxPage };
}

export default usePagination;
