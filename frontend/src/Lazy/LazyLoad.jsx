import Loadable from "react-loadable";
// import NavBar from "components/NavBar";
import Loading from "components/Loading";

const LandingPage = Loadable({
  loader: () => import("components/Home/Landing"),
  loading: Loading
});
const DishContainer = Loadable({
  loader: () => import("components/MainDishPage/DishContainer"),
  loading: Loading
});
const Login = Loadable({
  loader: () => import("components/Login"),
  loading: Loading
});
const Register = Loadable({
  loader: () => import("components/Register"),
  loading: Loading
});
const ResetPassword = Loadable({
  loader: () => import("components/ResetPassword"),
  loading: Loading
});
const ForgotPassword = Loadable({
  loader: () => import("components/ForgotPassword"),
  loading: Loading
});

const UserProfileContainer = Loadable({
  loader: () => import("components/UserProfilePage/UserProfileContainer"),
  loading: Loading
});

export {
  LandingPage,
  DishContainer,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  UserProfileContainer
};
