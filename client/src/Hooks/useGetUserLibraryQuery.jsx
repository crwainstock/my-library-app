import { useQuery, useMutation } from "@tanstack/react-query";
import { useGetLoginStatus } from "./useGetLoginStatus";

export const useGetUserLibraryQuery = () => {
  const { userId } = useGetLoginStatus();

  // Define a query key for fetching user books
  const userBooksQueryKey = ["userBooks", userId];

  // Create a query for fetching user books
  const {
    data: userBooks,
    isLoading,
    isError: isBooksError,
    error: booksError,
  } = useQuery(userBooksQueryKey, async () => {
    const response = await fetch(`users/userlibrary/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  // Define a mutation function for searching user books by ID
  const searchUserBooksByIdMutation = useMutation(async (bookId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: bookId }),
    };

    const results = await fetch(`/mylibrary/searchById`, options);
    if (!results.ok) {
      throw new Error("Network response was not ok");
    }

    return results.json();
  });

  const searchUserBooksById = (bookId) => {
    searchUserBooksByIdMutation.mutate(bookId, {
      enabled: Boolean(bookId),
    });
  };

  return {
    userBooks,
    loading: isLoading || searchUserBooksByIdMutation.isLoading,
    booksError: isBooksError ? booksError : null,
    searchUserBooksById,
  };
};

export default useGetUserLibraryQuery;
