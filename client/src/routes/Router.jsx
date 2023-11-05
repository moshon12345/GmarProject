import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import MoviesPage from "../movies/pages/MoviesPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import SignUpPage from "../users/pages/SignUpPage";
import Sandbox from "../sandbox/Sandbox";
import LoginPage from "../users/pages/LoginPage";
import Loops from "../sandbox/loops/Loops";
import UseState from "../sandbox/hooks/useState/UseState";
import SANDBOX_ROUTES from "./sandboxRoutesModel";
import LifeCycleHooks from "../sandbox/lifeCycleHooks/LifeCycleHooks";
import UseCounter from "../sandbox/useCounter/UseCounter";
import UseCallBackComp from "../sandbox/memozation/UseCallBackComp";
import A from "../sandbox/use-context/exeTwo/components/A";
import FormTest from "../sandbox/forms/FormTest";
import FormForEditUserPage from "../forms/components/FormForEditUserPage";
import UsersPage from "../users/pages/UsersPage";
import GeneralRatePage from "../movies/pages/GeneralRatePage";
import ControlPanelPage from "../movies/pages/ControlPanelPage";
import RatedMoviesPage from "../movies/pages/RatedMoviesPage";
import MovieDetailsPage from "../movies/pages/MovieDetailsPage";
import RatedMovUserForManager from "../movies/pages/RatedMovUserForManager";
import UsersPageToAdmin from "../users/pages/UsersPageToAdmin";
import BlockUserPage from "../pages/BlockUserPage";
import UsersPageToLimitCalls from "../users/pages/UsersPageToLimitCalls";
import NewPasswordPage from "../pages/NewPasswordPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<MoviesPage />} />
      <Route path={`${ROUTES.MOVIE_INFO}/:id`} element={<MovieDetailsPage />} />
      <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
      <Route path={`${ROUTES.MOVIES}/:id`} element={<MoviesPage />} />
      <Route path={`${ROUTES.CONTROL_PANEL}`} element={<ControlPanelPage />} />
      <Route path={`${ROUTES.USERS_TO_ADMIN_PAGE}`} element={<UsersPageToAdmin />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.BLOCK_USER_PAGE} element={<BlockUserPage />} />
      <Route path={ROUTES.LIMIT_USER_CALLS} element={<UsersPageToLimitCalls />} />
      <Route path={`${ROUTES.NEW_PASSWORD}/:id`} element={<NewPasswordPage />} />
      <Route path={ROUTES.GENERAL_RATES_PAGE} element={<GeneralRatePage />} />
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={`${ROUTES.RATE_MOVIES}`} element={<RatedMoviesPage />} />
      <Route path={`${ROUTES.USER_EDIT}/:id`} element={<FormForEditUserPage />} />
      <Route path={ROUTES.USER_EDIT} element={<FormForEditUserPage />} />
      <Route path={`${ROUTES.USER_VOTES_FOR_MANAGER}/:id`} element={<RatedMovUserForManager />} />
      <Route path={`${ROUTES.USERS_PAGE}`} element={<UsersPage />} />
      <Route path={ROUTES.SANDBOX} element={<Sandbox />}>
        <Route path={SANDBOX_ROUTES.LOOPS} element={<Loops />} />
        <Route path={SANDBOX_ROUTES.USE_STATE} element={<UseState />} />
        <Route path={SANDBOX_ROUTES.HOOKS} element={<LifeCycleHooks />} />
        <Route path={SANDBOX_ROUTES.USE_COUNTER} element={<UseCounter />} />
        <Route path={SANDBOX_ROUTES.USE_CALLBACK_BTN} element={<UseCallBackComp />} />
        <Route path={SANDBOX_ROUTES.USE_CONTEXT} element={<A />} />
        <Route path={SANDBOX_ROUTES.FORMS} element={<FormTest />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
