import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./Redux/Actions/commonUserCode";
import PrivateRoute from "./PrivateRoute";
import GetAllStudents from "./Pages/GetAllStudents/GetAllStudents";
import GetAllAdmin from "./Pages/GetAllAdmin/GetAllAdmin";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import GetAllHod from "./Pages/GetAllHod/GetAllHod";
import GetAllPrincipal from "./Pages/GetAllPrincipal/GetAllPrincipal";
import GetAllTeacher from "./Pages/GetAllTeacher/GetAllTeacher";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ViewLearningResourses from "./Pages/ViewLearningResourses/ViewLearningResourses";
import UploadLearningResources from "./Pages/ViewLearningResourses/UploadLearningResources";
import Fee from "./Pages/Fee/Fee";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";

const App = () => {
  const student = useSelector((state) => state.student);
  const teacher = useSelector((state) => state.teacher);
  const hod = useSelector((state) => state.hod);
  const admin = useSelector((state) => state.admin);
  const principal = useSelector((state) => state.principal);
  const dispatch = useDispatch();

  //For loading
  const studentListLoading = useSelector((state) => state.studentList.loading);
  const adminListLoading = useSelector((state) => state.adminList.loading);
  const hodListLoading = useSelector((state) => state.hodList.loading);
  const principalListLoading = useSelector(
    (state) => state.principalList.loading
  );
  const resourceListLoading = useSelector(
    (state) => state.resourceList.loading
  );
  //For loading

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      student.loading ||
      teacher.loading ||
      hod.loading ||
      admin.loading ||
      principal.loading
      // studentListLoading ||
      // adminListLoading ||
      // hodListLoading ||
      // principalListLoading ||
      // resourceListLoading
    ) {
      console.log("Loading...");
      setLoading(true);
    } else {
      console.log("No loading");
      setLoading(false);
    }
  }, [
    teacher.loading,
    student.loading,
    hod.loading,
    admin.loading,
    principal.loading,
    // studentListLoading,
    // adminListLoading,
    // hodListLoading,
    // principalListLoading,
    // resourceListLoading,
  ]);

  useEffect(() => {
    if (
      !teacher.authenticate ||
      !student.authenticate ||
      !hod.authenticate ||
      !admin.authenticate ||
      !principal.authenticate
    ) {
      dispatch(isUserLoggedIn());
    }
  }, [
    teacher.authenticate,
    student.authenticate,
    hod.authenticate,
    admin.authenticate,
    principal.authenticate,
  ]);

  return (
    <div className="app_container">
      {loading ? (
        <LoadingAnimation loading={loading} />
      ) : (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/get-all-students"
            element={
              <PrivateRoute>
                <GetAllStudents />
              </PrivateRoute>
            }
          />

          <Route
            path="/get-all-admin"
            element={
              <PrivateRoute>
                <GetAllAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/get-all-hod"
            element={
              <PrivateRoute>
                <GetAllHod />
              </PrivateRoute>
            }
          />

          <Route
            path="/get-all-principal"
            element={
              <PrivateRoute>
                <GetAllPrincipal />
              </PrivateRoute>
            }
          />

          <Route
            path="/get-all-teacher"
            element={
              <PrivateRoute>
                <GetAllTeacher />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-learning-resources"
            element={
              <PrivateRoute>
                <ViewLearningResourses />
              </PrivateRoute>
            }
          />
          <Route
            path="upload-learning-resources"
            element={
              <PrivateRoute>
                <UploadLearningResources />
              </PrivateRoute>
            }
          />
          <Route
            path="account-fee"
            element={
              <PrivateRoute>
                <Fee />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/password-reset" element={<ForgotPassword />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
