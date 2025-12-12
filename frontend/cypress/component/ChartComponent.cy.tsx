import GlobalContext from "../../src/GlobalContext.ts";
import { ChartComponent } from "../../src/Components/ChartComponent.tsx";

describe("<ChartComponent />", () => {
	it("renders", () => {
		cy.mount(
			<GlobalContext.Provider
				value={{
					loggedInUserId: "1",
					setLoggedInUserId: () => {},
					users: [],
					setUsers: () => {},
				}}>
				<ChartComponent />
			</GlobalContext.Provider>
		);
		cy.get('[data-cy="chart-component"]').should("exist");
	});
});
