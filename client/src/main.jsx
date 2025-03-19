import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CoursesProvider } from "./context/CoursesContext";
import { EnrollmentsProvider } from "./context/EnrollmentsContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import { UsersProvider } from "./context/UsersContext";
import { CourseVideosProvider } from "./context/CourseVideosContext";
import { InstructorsProvider } from "./context/InstructorsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UsersProvider>
        <CoursesProvider>
          <CourseVideosProvider>
            <EnrollmentsProvider>
              <CategoriesProvider>
                <ReviewsProvider>
                  <InstructorsProvider>
                  <App />
                  </InstructorsProvider>
                </ReviewsProvider>
              </CategoriesProvider>
            </EnrollmentsProvider>
          </CourseVideosProvider>
        </CoursesProvider>
      </UsersProvider>
    </AuthProvider>
  </BrowserRouter>
);
