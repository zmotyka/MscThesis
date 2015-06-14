Feature: Page report weekly/monthly toggle
	Scenario: Weekly/Monthly toggle on Page Report View
		Given the User has access to OneSearch.Spa
			And the page report view is shown with Weekly option selected by default
			And there is data for page level report
		When I change the mode to Monthly
		Then the values of Summary and Grid components should be updated accordingly
			And Url will be updated containing LastMonth
			And I can change the mode back to Weekly