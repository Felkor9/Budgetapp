import { useState } from "react";

function NavBar() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
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
				<div className="flex items-center justify-between text-black text-sm flex-row ">
					<img src="./public/vite.svg" alt="Logo" className="" />
				</div>
				<div className="flex-1 flex items-center justify-center">
					<h1>My budget app</h1>
				</div>
				<div>
					<img
						src="../public/icons8-hamburger.svg"
						alt="hamburger"
						className="w-10 h-10 items-end"
						onClick={() => handleMenu()}
					/>
				</div>
			</div>

			{isMenuVisible && (
				<div className="absolute top-0 right-0 z-[1000] bg-black w-[100%] h-[200px] mt-[50px] duration-300 ease-in-out backdrop-opacity-60">
					<div className="text-white flex flex-col items-start p-6 justify-evenly h-[100%] ">
						<button>Home</button>
						<button>My Budgets</button>
						<button>Contact</button>
						<button>Log out</button>
					</div>
				</div>
			)}
		</>
	);
}

export default NavBar;
