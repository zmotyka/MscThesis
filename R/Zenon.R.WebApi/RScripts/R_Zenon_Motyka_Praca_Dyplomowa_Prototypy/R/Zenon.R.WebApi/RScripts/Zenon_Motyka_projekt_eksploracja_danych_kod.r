# Wymagana uprzednia instalacja pakietu corrplot oraz rgl!
library(corrplot)
library(rgl)
source('eksploracja.r')

getMappedGlassData <- function (rawData){
	glassData <- data.frame(
		ri = rawData$szklo.B[,1],
		na = rawData$szklo.B[,2],
		mg = rawData$szklo.B[,3],
		al = rawData$szklo.B[,4],
		si = rawData$szklo.B[,5],
		k = rawData$szklo.B[,6],
		ca = rawData$szklo.B[,7],
		ba = rawData$szklo.B[,8],
		fe = rawData$szklo.B[,9]
	)

	return(glassData)
}

showMinMaxMeanSd <- function (rawData, glassData){
	# Wyświetlenie struktur źródła danych w tym liczby wierszy danych
	print(ls.str(rawData))
	# show max, min, mean 
	print(summary(glassData))

	# show standard deviation as it is not included in summary above
	sd <- data.frame(
		ri = sd(glassData$ri),
		na = sd(glassData$na),
		mg = sd(glassData$mg),
		al = sd(glassData$al),
		si = sd(glassData$si),
		k = sd(glassData$k),
		ca = sd(glassData$ca),
		ba = sd(glassData$ba),
		fe = sd(glassData$fe)
	)
	print('Odchylenie standardowe')
	print(sd)
}

showHistograms <- function (glassData){
	# ============= Histogramy ======================
	colors <- c(rgb(0,0,1,0.25))
	 
	hist(glassData$ri, 60, col = colors)
	 
	hist(glassData$na, 60, col = colors)
	 
	hist(glassData$mg, 60, col = colors)
	 
	hist(glassData$al, 60, col = colors)
	 
	hist(glassData$si, 60, col = colors)
	 
	hist(glassData$k, 60, col = colors)
	 
	hist(glassData$ca, 60, col = colors)
	 
	hist(glassData$ba, 60, col = colors)
	 
	hist(glassData$fe, 60, col = colors)
}

showScatterCharts <- function (glassData){
	# =============== Wykresy punktowe ================
	 
	plot(glassData$na, glassData$ri)
	 
	plot(glassData$mg, glassData$ri)
	 
	plot(glassData$al, glassData$ri)
	 
	plot(glassData$si, glassData$ri)
	 
	plot(glassData$k, glassData$ri)
	 
	plot(glassData$ca, glassData$ri)
	 
	plot(glassData$ba, glassData$ri)
	 
	plot(glassData$fe, glassData$ri)

	 
	pairs(glassData)
}

showBoxPlotAnalysis <- function(rawGlassData, glassData){
	# Odstęp międzykwartylowy
	print(paste('IQR: ', IQR(rawGlassData$szklo)))
	# Wykres pudełkowy
	 
	boxplot(glassData)
}

getOind <- function(value) {
	result <- abs(value - mean(value)) < 3*sd(value)
  	return(result)
}

drawOind <- function (x, y, oind){
	 
	plot(x, y, pch=16,col=oind+1)
}

analyseOind <- function (glassData, value){
	oind <- getOind(value)
	drawOind(glassData$ri, value, oind)
}

showOindAnalysis <- function (glassData){
	analyseOind(glassData, glassData$ri)
	analyseOind(glassData, glassData$na)
	analyseOind(glassData, glassData$mg)
	analyseOind(glassData, glassData$al)
	analyseOind(glassData, glassData$si)
	analyseOind(glassData, glassData$k)
	analyseOind(glassData, glassData$ca)
	analyseOind(glassData, glassData$ba)
	analyseOind(glassData, glassData$fe)
}

getDataWithoutOutliers <- function (glassData){
	# data for processing
	procGlassData <- glassData
	oind <- getOind(procGlassData$ri)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$na)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$mg)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$al)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$si)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$k)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$ca)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$ba)
	procGlassData <- procGlassData[oind,]
	oind <- getOind(procGlassData$fe)
	procGlassData <- procGlassData[oind,]
	return(procGlassData)
}

getNormalisedData <- function (glassData){
	# Normalizacja
	normGlassData = data.frame(
		ri = (glassData$ri - min(glassData$ri))/(max(glassData$ri) - min(glassData$ri)),
		na = (glassData$na - min(glassData$na))/(max(glassData$na) - min(glassData$na)),
		mg = (glassData$mg - min(glassData$mg))/(max(glassData$mg) - min(glassData$mg)), 
		al = (glassData$al - min(glassData$al))/(max(glassData$al) - min(glassData$al)), 
		si = (glassData$si - min(glassData$si))/(max(glassData$si) - min(glassData$si)), 
		k = (glassData$k - min(glassData$k))/(max(glassData$k) - min(glassData$k)), 
		ca = (glassData$ca - min(glassData$ca))/(max(glassData$ca) - min(glassData$ca)),
		ba = (glassData$ba - min(glassData$ba))/(max(glassData$ba) - min(glassData$ba)), 
		fe = (glassData$fe - min(glassData$fe))/(max(glassData$fe) - min(glassData$fe)) 
	)
	return(normGlassData)
}

drawCovarianceGrid <- function (normalisedGlassData){
	corGlassData <- cor(normalisedGlassData)
	 
	corrplot(corGlassData, method = "circle")
}

getGroupedData <- function (glassData, numberOfGroups){
	data <- data.frame(
		ri = glassData$ri,
		mg = glassData$mg,
		fe = glassData$fe
	)
	g <- kmeans(data, numberOfGroups) 
	data <- cbind(data, c = g$cluster) # Add group number as a column
	return(data)	
}

showGroups <- function (groupedGlassData){
	open3d()
	plot3d(
		groupedGlassData$ri, 
		groupedGlassData$mg, 
		groupedGlassData$fe, 
		col=groupedGlassData$c,
		type="s",
		size=1
	)
	plot3d(
		groupedGlassData$ri, 
		groupedGlassData$mg, 
		groupedGlassData$fe, 
		col=groupedGlassData$c,
		type="h",
		size=1,
		add=TRUE
	)
}

getDataForClassification <- function (groupedGlassData){
	result <- NULL
	result$m <- cbind(groupedGlassData$ri, groupedGlassData$mg, groupedGlassData$fe)
	result$c <- groupedGlassData$c
	return(result)
}

pokaz_md_3d <- function (md) {
	s = srednie_md(md)
  	
  	open3d()
 	if (is.null(md$opis_ucz)) # macierz typu md
  	{
  		plot3d(
			md$m[,1], 
			md$m[,2], 
			md$m[,3],
			col=md$c,
			type="p",
			size=3
		)
		plot3d(
			md$m[,1], 
			md$m[,2], 
			md$m[,3],
			col=md$c,
			type="h",
			size=1,
	  		add=TRUE
		)
  	}
  	else  # macierz md po podziale funkcj¹ podziel_md
  	{
  		plot3d(
			md$opis_ucz[,1], 
			md$opis_ucz[,2], 
			md$opis_ucz[,3],
			col=md$dec_ucz,
			type="p",
			size=3
		)
		plot3d(
			md$opis_ucz[,1], 
			md$opis_ucz[,2], 
			md$opis_ucz[,3],
			col=md$dec_ucz,
			type="h",
			size=1,
	  		add=TRUE
		)
		plot3d(
	  		md$opis_test[,1],
	  		md$opis_test[,2],
	  		md$opis_test[,3],
	  		type="s",
	  		size=1,
	  		col=md$dec_test,
	  		add=TRUE
		)
		plot3d(
	  		md$opis_test[,1],
	  		md$opis_test[,2],
	  		md$opis_test[,3],
	  		type="h",
	  		size=1,
	  		col=md$dec_test,
	  		add=TRUE
		)
  	}
  	# narysuj środkowe punkty dla grup
  	plot3d(
		s[,1],
		s[,2],
		s[,3],
		type="s",
		size=4,
		col=1:length(s[,1]),
		alpha=0.6,
		add=TRUE
	)
}

granice_dec_3d <- function (typ, md, k = 1)
{
	s = srednie_md(md)

  	md2 = sklej_md(md)
  	mi = mins_md(md2)
  	ma = maxs_md(md2)
  	mi = colMins(mi)
  	ma = colMaxs(ma)
  	krok = 0.2
  	s1 = seq(mi[1],ma[1],krok)
  	s2 = seq(mi[2],ma[2],krok)
  	s3 = seq(mi[3],ma[3],krok)
  	g = expand.grid(s1,s2,s3)
  	klas = klasyfikuj(typ, md, g, k)
  	
  	open3d()
  	# siatka z granicami klasyfikacji
  	plot3d(
		g[,1],
		g[,2],
		g[,3],
		col=klas,
		type="p",
		size=1,
		alpha=0.5
	)
	segments3d(g[,1],g[,2],g[,3],col=klas, lwd=80, alpha=0.1)
  	
  	# dane uczace
  	plot3d(
		md$opis_ucz[,1],
		md$opis_ucz[,2],
		md$opis_ucz[,3],
		type="p",
		size=3,
		col=md$dec_ucz,
		add=TRUE
	)
	plot3d(
		md$opis_ucz[,1],
		md$opis_ucz[,2],
		md$opis_ucz[,3],
		type="h",
		size=1,
		col=md$dec_ucz,
		add=TRUE
	)
	
	# dane testowe
	plot3d(
		md$opis_test[,1],
		md$opis_test[,2],
		md$opis_test[,3],
		type="s",
		size=1,
		col=md$dec_test,
		add=TRUE
	)
	plot3d(
		md$opis_test[,1],
		md$opis_test[,2],
		md$opis_test[,3],
		type="h",
		size=1,
		col=md$dec_test,
		add=TRUE
	)
	# centra klasyfikacji
	plot3d(
		s[,1],
		s[,2],
		s[,3],
		type="s",
		size=4,
		col=1:length(s[,1]),
		alpha=0.6,
		add=TRUE
	)
}

showSummaryInfo <- function (rawGlassData, glassData){
	showMinMaxMeanSd(rawGlassData, glassData)
	showHistograms(glassData)
	showScatterCharts(glassData)
	showBoxPlotAnalysis(rawGlassData, glassData)
	showOindAnalysis(glassData)
}

showGroupingResults <- function (glassDataWithoutOutliers, normalisedGlassData, groupedGlassData){
	print(ls.str(glassDataWithoutOutliers))
	drawCovarianceGrid(normalisedGlassData)
	showGroups(groupedGlassData)
}

showClassificationTests <- function (classificationGlassData, learningGlassData){
	 
	pokaz_md_3d(classificationGlassData)
	pokaz_md_3d(learningGlassData)

	granice_dec_3d('knn', learningGlassData)
	print('Weryfikacja klasyfikatora k-najblizszych sasiadow')
	weryfikuj('knn', learningGlassData)

	granice_dec_3d('np', learningGlassData)
	print('Weryfikacja klasyfikatora najblizszego prototypu')
	weryfikuj('np', learningGlassData)

	granice_dec_3d('bayes', learningGlassData)
	print('Weryfikacja naiwnego klasyfikatora Bayesa')
	weryfikuj('bayes', learningGlassData)

	granice_dec_3d('drzewo', learningGlassData)
	print('Weryfikacja drzewa')
	weryfikuj('drzewo', learningGlassData)
}

runAnalysis <- function (glassDataFilePath){
	rawGlassData <- readMat(glassDataFilePath)
	glassData <- getMappedGlassData(rawGlassData)

	# ============ SUMMARY ============
	showSummaryInfo(rawGlassData, glassData)

	# ============ GROUPING ============
	glassDataWithoutOutliers <- getDataWithoutOutliers(glassData)
	normalisedGlassData <- getNormalisedData(glassDataWithoutOutliers)
	groupedGlassData <- getGroupedData(normalisedGlassData, 5)
	
	#showGroupingResults(glassDataWithoutOutliers, normalisedGlassData, groupedGlassData)
	
	# ============ CLASSIFICATION ============
	#classificationGlassData <- getDataForClassification(groupedGlassData)
	#learningGlassData <- podziel_md(classificationGlassData, 0.7, 1)
	
	#showClassificationTests(classificationGlassData, learningGlassData)
}

getHistogram <- function(glassDataFilePath){
	rawGlassData <- readMat(glassDataFilePath)
	glassData <- getMappedGlassData(rawGlassData)

	return(hist(glassData$ri, plot=FALSE))
}

getGlassData <- function(glassDataFilePath){
	rawGlassData <- readMat(glassDataFilePath)
	glassData <- getMappedGlassData(rawGlassData)

	return(glassData)
}