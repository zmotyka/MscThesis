Feature: Page report drill up
	Scenario: Drill up on Page Grid
		Given The Page Report is currently displaying data
			And the selected group has a parent group
		When I click on the name of the parent group above the grid
		Then it should drill up to that parent group
			And shows the Summary data for that group
			And shows the aggregated values on the Grid for the child groups

