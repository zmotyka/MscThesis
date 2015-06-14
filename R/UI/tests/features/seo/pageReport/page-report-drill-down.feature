Feature: Page report drill down
	Scenario: Drill down on Page Report
		Given the User has access to OneSearch.Spa
			And there is data for page level report
			And the initial page report is displayed
		When I click on the name of grid entry
		Then it should drill down 
			And show the data for that entry
			And I can drill up to the parent node
	
	Scenario: Drill down to page level on Page Grid
		Given The Page Report shows the data for the lowest level Group
		When I click on the name of a group in the grid
		Then it should show the list of all pages in the selected Group
			And I should be able to navigate to any of those pages
