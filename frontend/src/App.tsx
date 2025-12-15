import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./Components/Navbar";
import { createHashRouter, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import CreateUser from "./Views/CreateUser";
import GlobalContext from "./GlobalContext";
import ProtectedRoute from "./ProtectedRoute";
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
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/dashboard",
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{ path: "/createuser", element: <CreateUser /> },
		],
	},
]);
export function App() {
	const [loggedInUserId, setLoggedInUserId] = useState(
		localStorage.getItem("loggedInUserId") || null
	);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`/api/users?user_id=${loggedInUserId}`)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});
	});

	return (
		<>
			<GlobalContext.Provider value={{ loggedInUserId, setLoggedInUserId, users, setUsers }}>
				<ToastContainer
					position="top-right"
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
			</GlobalContext.Provider>
		</>
	);
}

export default App;
