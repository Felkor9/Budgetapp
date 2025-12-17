import AddNewSalary from "../../src/Components/AddNewSalary.tsx";
import GlobalContext from "../../src/GlobalContext.ts";

describe("addnewsalary.cy.tsx", () => {
	it("Testning för newSalaryCompoonent", () => {
		// mountar
		cy.mount(
			<GlobalContext.Provider
				value={{
					loggedInUserId: "1",
					setLoggedInUserId: () => {},
					users: [],
					setUsers: () => {},
				}}>
				<AddNewSalary onSalaryUpdated={() => {}} />
			</GlobalContext.Provider>
		);

		// //klickar på knappen för att öppna en modal
		cy.get('[data-cy="add-salary-btn"]').click();

		// //modalen existerar
		cy.get('[data-cy="salary-container"]').should("exist");

		// //Skriver in vår nya lön
		cy.get('[data-cy="salary-input"]').type("42000");

		// //uppdaterar vår nya lön
		cy.get('[data-cy="update-salary-btn"]').click();

		// //tittar så att lön har uppdaterat sig
		cy.get('[data-cy="salary-container"]').should("not.exist");

		// // hämtar data och ser ifall den uppdaterats
		cy.intercept({
			method: "GET",
			url: "http://localhost:3000/api/settings",
		});
	});
});
