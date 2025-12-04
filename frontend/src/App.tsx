import "./App.css";
import NavBar from "./components/NavBar";
import LandingPage from "./Views/LandingPage";
import { createHashRouter, Outlet, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import LogIn from "./Views/LogIn";
import CreateUser from "./Views/CreateUser";
import Dashboard from "./Views/Dashboard";

const router = createHashRouter([
	{
		element: (
			<>
				<NavBar />
				<main>
					<Outlet />
				</main>
			</>
		),
		children: [
			{ index: true, element: <LandingPage /> },
			{
				path: "/login",
				element: <LogIn />,
			},
			{
				path: "/createuser",
				element: <CreateUser />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<ToastContainer
				position="bottom-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
