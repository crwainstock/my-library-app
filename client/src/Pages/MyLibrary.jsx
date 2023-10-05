import React from "react";
import { useGetUserLibrary } from "../Hooks/useGetUserLibrary";
import MyLibraryComponent from "../Components/MyLibrary/MyLibraryComponent";
import Loading from "../Components/Loading/Loading";
import { useGetLoginStatus } from "../Hooks/useGetLoginStatus";

// export async function loader({ req }) {
//   await ensureUserLoggedIn(req);
//   const hostVansPromise = getHostVans();
//   console.log(hostVansPromise);
//   return defer({ vans: hostVansPromise });
// }

function MyLibrary() {
  const { loading } = useGetUserLibrary();
  const { isLoggedIn } = useGetLoginStatus();
  console.log(isLoggedIn);

  return (
    <div>
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <h2>{isLoggedIn}</h2>
      <MyLibraryComponent />
    </div>
  );
}

export default MyLibrary;
