Feature: Page Report classification
	As a user
	I want to change the classification in the Page Level report
	So I can see the report against different hierarchies

	Scenario: Changing the classification
		Given the user is logged in
			And the user has access to the Page Level report
			And the selected Program has 2 Page Classifications defined
		When I change the classification
		Then I should see the report for the top level group of that classification