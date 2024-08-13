import { Outlet } from "react-router-dom";
import { useAppContext } from "../store/appContext/app-context";

const PublicRouter = () => {
  const { loadingContext } = useAppContext();

  return (
    <div>
      {loadingContext ? (
        <div>LOADING</div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default PublicRouter;
