import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalContext from "../GlobalContext";
function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { setLoggedInUserId } = React.useContext(GlobalContext);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3000/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			console.log("Login response data:", data);

			if (response.ok) {
				localStorage.setItem("loggedInUserId", data.user.id);
				setLoggedInUserId(data.user.id);
				navigate("/dashboard");
			}
		} catch (err) {
			toast.error("Login failed");
			console.error("Login error:", err);
		}
	};

	return (
		<>
			<div
				data-cy="home-div"
				className="bg-white-50 h-screen flex items-center justify-start flex-col bg-blue-50">
				<h1 className="text-xl font-bold mt-20">Welcome</h1>
				<form data-cy="form" action="" className="flex flex-col mt-20">
					<label htmlFor="email">Email</label>
					<input
						data-cy="email"
						id="email"
						autoComplete="true"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Email"
						className="p-3 border-2 rounded-lg bg-white w-[300px]"
					/>
					<label className="mt-4" htmlFor="password">
						Password
					</label>
					<input
						data-cy="password"
						id="password"
						autoComplete="true"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						className="p-3 border-2 rounded-lg bg-white w-[300px]"
					/>
					<p className="self-center">
						har du inget konto?
						<Link className="text-blue-600 underline" to="/createuser" data-cy="create-btn">
							{" "}
							Skapa Här
						</Link>
					</p>
					<button
						data-cy="login-button"
						className="border mt-7 bg-black text-white p-3 w-[60%] self-center rounded-lg"
						onClick={handleLogin}>
						Log in
					</button>
				</form>
			</div>
		</>
	);
}
export default Home;
