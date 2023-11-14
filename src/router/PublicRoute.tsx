import { Navigate } from "react-router-dom";
import { RouteProps } from "../interfaces/index";
import { useAppSelector } from "../store/hooks/index";

const PublicRoute = ({ children }: RouteProps) => {
  const { isAuth } = useAppSelector((state) => state.authetication);
  return isAuth ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
