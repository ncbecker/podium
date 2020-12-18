import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute(props) {
  const { user } = useAuth();

  return user ? <Route {...props} /> : <Redirect to="/" />;
}
