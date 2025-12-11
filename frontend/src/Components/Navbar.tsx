import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";

function NavBar() {
	const navigate = useNavigate();

	const [isMenuVisible, setIsMenuVisible] = useState(false);
	function handleMenu() {
		setIsMenuVisible(!isMenuVisible);
	}

	const { loggedInUserId, setLoggedInUserId } = useContext(GlobalContext);

	useEffect(() => {
		if (!loggedInUserId) return;

		console.log("loggedInUserId ändrades:", loggedInUserId);

		fetch(`/api/users?user_id=${loggedInUserId}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched user data:", data);
			});
	}, [loggedInUserId]);

	return (
		<>
			<>
				<div className="flex items-center justify-start bg-white h-15 w-[screen] p-3">
					<div>
						<img
							src="/icons8-hamburger.svg"
							alt="hamburger"
							className="w-10 h-10 items-end"
							onClick={handleMenu}
						/>
					</div>
					<div className="flex-1 flex items-center justify-center">
						<h1>My budget app Inloggad: {loggedInUserId}</h1>
					</div>
					<div className="flex items-center justify-between text-black text-sm flex-row ">
						<img src="/logo.svg" alt="Logo" width={30} className="" />
					</div>
				</div>

				<div
					className={`fixed top-0 left-0 z-50 w-[70%] bg-blue-900  h-screen mt-14
  transition-transform duration-300 ease-in-out
  ${isMenuVisible ? "translate-x-0" : "-translate-x-full"}
 rounded-r-lg `}
					onMouseLeave={() => setIsMenuVisible(false)}>
					<div className="flex justify-center items-center flex-col gap-3 h-40 mt-30">
						<img src="./react.svg" width={100} alt="Profile" />
						<h1 className="text-white text-xl">My budget app</h1>
					</div>
					<div className="flex flex-col items-start gap-5 mt-10 text-white h-full p-3">
						<div className="w-full h-0.5  bg-white"></div>
						<button className="hover:underline cursor-pointer">
							{" "}
							<Link to="/">Home</Link>
						</button>
						<button className="hover:underline cursor-pointer">
							<Link to={"/dashboard"}>My Budgets</Link>
						</button>
						<button className="hover:underline cursor-pointer">Contact</button>
						{loggedInUserId != null && (
							<button
								className="hover:underline cursor-pointer"
								onClick={() => {
									localStorage.removeItem("loggedInUserId");
									setLoggedInUserId(null);
									navigate("/");
									setIsMenuVisible(false);
								}}>
								Logga ut
							</button>
						)}
						{loggedInUserId == null && (
							<button
								className="hover:underline cursor-pointer"
								onClick={() => {
									navigate("/");
									setIsMenuVisible(false);
								}}>
								Logga in
							</button>
						)}

						<div className="w-full h-0.5 mt-10 bg-white"></div>
					</div>
				</div>
			</>
		</>
	);
}

export default NavBar;
