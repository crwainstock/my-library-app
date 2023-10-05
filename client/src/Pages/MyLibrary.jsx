import React from "react";
// import { useDataContext } from "../Hooks/useDataContext";
import { useGetUserLibrary } from "../Hooks/useGetUserLibrary";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";

// export async function loader({ req }) {
//   await ensureUserLoggedIn(req);
//   const hostVansPromise = getHostVans();
//   console.log(hostVansPromise);
//   return defer({ vans: hostVansPromise });
// }

function MyLibrary() {
  const { loading } = useGetUserLibrary();

  return (
    <div>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}

      <MyLibraryComponent />
    </div>
  );
}

export default MyLibrary;
