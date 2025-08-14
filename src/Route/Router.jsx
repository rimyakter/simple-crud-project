import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layout/MainLayout";
import App from "../App.jsx";
import UserDetail from "../Components/UserDetail.jsx";
import UpdateUser from "../Components/UpdateUser.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        path: "/",
        Component: App,
      },
      {
        path: "/users/:id",
        Component: UserDetail,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
      },
      {
        path: "/updateUser/:id",
        Component: UpdateUser,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
      },
    ],
  },
]);
