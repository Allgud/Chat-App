import { Navigate } from "react-router-dom";
import { RouteProps } from "../interfaces/index";
import { useAppSelector } from "../store/hooks";

const PrivateRoute = ({ children }: RouteProps) => {
  const { isAuth } = useAppSelector((state) => state.authetication);
  return !isAuth ? <Navigate to="/auth" replace /> : children;
};

export default PrivateRoute;
