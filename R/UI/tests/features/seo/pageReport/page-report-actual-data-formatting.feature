Feature: Page report actual number formatting
	Scenario: Format data on a Page Report for Actual
		Given The Page Report is currently displaying Actual data
		When I look at the data in the Page Report
		Then Number of Pages will be displayed as an integer with format #,###,###
			And Number of Keywords will be displayed as an integer with format #,###,###
			And Volume will be displayed as an decimal with format #,###,###.#
			And Reach will be displayed as an decimal with format #,###,###.#
			And Reach% will be displayed as an decimal with format ###.##%
			And Rank will be displayed as an decimal with format ##.# or N/R
			And Traffic will be displayed as an integer with format #,###,###
			And Orders will be displayed as an integer with format #,###,###
			And Revenue will be displayed as a currency with format £#,###,###.##
			And CVR will be displayed as an decimal with format ###.##%
			And if a value is not available a - will be used to indicate this 
