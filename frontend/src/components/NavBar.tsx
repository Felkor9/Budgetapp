import { useState } from "react";
import { useAuth } from "../Auth";
import { Link } from "react-router";

function NavBar() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const { logoutUser } = useAuth();
	function handleMenu() {
		if (isMenuVisible == false) {
			setIsMenuVisible(true);
		} else {
			setIsMenuVisible(false);
		}
	}
	return (
		<>
			<div className="flex items-center justify-start bg-white h-15 w-[screen] p-3">
				<div>
					<img
						src="/icons8-hamburger.svg"
						alt="hamburger"
						className="w-10 h-10 items-end"
						onClick={() => handleMenu()}
					/>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<h1>My budget app</h1>
				</div>
				<div className="flex items-center justify-between text-black text-sm flex-row ">
					<img src="/vite.svg" alt="Logo" className="" />
				</div>
			</div>

			<div
				className={`fixed top-0 left-0 z-50 w-[70%] bg-blue-900/100  h-[100vh] mt-14
  transition-transform duration-300 ease-in-out
  ${isMenuVisible ? "translate-x-0" : "-translate-x-full"}
 rounded-r-lg `}>
				<div className="flex justify-center items-center flex-col gap-3 h-40 mt-7">
					<img src="./react.svg" width={100} alt="Profile" />
					<h1 className="text-white text-xl">My budget app</h1>
				</div>
				<div className="flex flex-col items-start gap-5  text-white h-[100%] p-3">
					<button className="hover:underline cursor-pointer">
						{" "}
						<Link to="/dashboard">Home</Link>
					</button>
					<button className="hover:underline cursor-pointer">My Budgets</button>
					<button className="hover:underline cursor-pointer">Contact</button>
					<button className="hover:underline cursor-pointer" onClick={() => logoutUser()}>
						Log out
					</button>
					<div className="w-[100%] h-0.5 bg-white"></div>
				</div>
			</div>
		</>
	);
}

export default NavBar;
