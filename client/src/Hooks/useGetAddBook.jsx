import { useDataContext } from "./useDataContext";

export const useGetAddBook = () => {
  const { userId } = useDataContext();

  // TO ADD A BOOK TO USER LIBRARY
  const addBook = async (e) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: e }),
    };
    try {
      let results = await fetch(`/userlibrary/${userId}`, options);
      let data = await results.json();
      // console.log(data);
      setLoading(false);
      setSuccess(true);
      setBookAdded(true);
    } catch (err) {
      console.log(err);
    }
  };

  return { addBook };
};
