import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme.js";
import GiveEvaluationPage from "./components/GiveEvaluation/GiveEvaluationPage";
import LandingPage from "./components/ui/LandingPage";
import MyEvaluationPage from "./components/MyEvaluation/MyEvaluationPage";
import LoginPage from "./components/ui/LoginPage";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { useSelector, useDispatch } from "react-redux";

function App() {
  const [value, setValue] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/give" element={<GiveEvaluationPage />} />
          <Route path="/me" element={<MyEvaluationPage />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
