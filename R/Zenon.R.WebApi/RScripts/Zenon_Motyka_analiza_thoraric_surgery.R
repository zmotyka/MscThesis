library (MASS)
library (gtools)
library (gdata)
library (gridExtra)
library (gmodels)
library (sfsmisc)
library (polycor)
library(foreign)
  
getMappedData <- function (rawData){
  result <- data.frame(
    diagnosis = rawData$DGN,
    fvc = rawData$PRE4,
    fev1 = rawData$PRE5,
    performanceStatus = rawData$PRE6,
    painBeforeSurgery = rawData$PRE7,
    haemoptysisBeforeSurgery = rawData$PRE8,
    dyspnoeaBeforeSurgery = rawData$PRE9,
    coughBeforeSurgery = rawData$PRE10,
    weaknessBeforeSurgery = rawData$PRE11,
    sizeOfOriginalTumor = rawData$PRE14,
    diabetesMellitus = rawData$PRE17,
    miUpTo6months = rawData$PRE19,
    pad = rawData$PRE25,
    smoking = rawData$PRE30,
    asthma = rawData$PRE32,
    age = rawData$AGE,
    risk1yr = rawData$Risk1Yr
  )
  
  return(result)
}

getNumericData <- function (myData){
  result <- data.frame(
    fvc = myData$fvc,
    fev1 = myData$fev1,
    age = myData$age
  )
  
  return(result)
}

getBinaryData <- function (myData) {
  
  result <- data.frame(
    painBeforeSurgery = myData$painBeforeSurgery,
    haemoptysisBeforeSurgery = myData$haemoptysisBeforeSurgery,
    dyspnoeaBeforeSurgery = myData$dyspnoeaBeforeSurgery,
    coughBeforeSurgery = myData$coughBeforeSurgery,
    weaknessBeforeSurgery = myData$weaknessBeforeSurgery,
    diabetesMellitus = myData$diabetesMellitus,
    smoking = myData$smoking,
    risk1yr = myData$risk1yr
  )
  
  return(result)
}

getOind <- function(value) {
  result <- abs(value - mean(value)) < 2*sd(value)
  return(result)
}

drawOind <- function (x, y, oind, xlab, ylab){
  
  plot(x, y, pch=16,col=oind+1, main = "Outlier Analysis", xlab = xlab, ylab = ylab)
}

analyseOind <- function (x, y, xlab, ylab){
  oind <- getOind(x)
  drawOind(x, y, oind, xlab, ylab)
}

showOindAnalysis <- function (myData){
  analyseOind(myData$fvc, myData$fev1, xlab = "FVC", ylab = "FEV1")
  analyseOind(myData$fev1, myData$fvc, xlab = "FEV1", ylab = "FVC")
}

getDataWithoutOutliers <- function (myData){
  # data for processing
  procData <- myData
  oind <- getOind(procData$fvc)
  procData <- procData[oind,]
  oind <- getOind(procData$fev1)
  procData <- procData[oind,]
  
  return(procData)
}

getNormalisedData <- function (myData){
  # Normalizacja
  normalisedData <- myData
  normalisedData$fev1 = (myData$fev1 - min(myData$fev1))/(max(myData$fev1) - min(myData$fev1))
  normalisedData$fvc = (myData$fvc - min(myData$fvc))/(max(myData$fvc) - min(myData$fvc))
  normalisedData$age = (myData$age - min(myData$age))/(max(myData$age) - min(myData$age))
  
  return(normalisedData)
}

drawCovarianceGrid <- function (normalisedData){
  library(corrplot)
  corData <- cor(normalisedData)
  
  corrplot(corData, method = "pie")
}

factorAnalysis <- function(myData)
{
  library(polycor)
  library(corrplot)
  # Factor analysis
  binaryData <- getBinaryData(myData)
  factorisedData <- sapply(binaryData, as.factor)
  het <- hetcor(factorisedData)$cor
  
  corrplot(het, method = "square")
  fa.1 <- factanal(covmat = het, factors = 2, rotation = "varimax")
  fa.1 
}

compareSmokersWithSizeOfTumor <- function(myData)
{
  library(gmodels)
  
  sizeOfOriginalTumor <- factor(myData$sizeOfOriginalTumor, levels = c('OC11','OC12', 'OC13', 'OC14'))
  freqTumor <- table(sizeOfOriginalTumor)
  relFreqTumor <- table(sizeOfOriginalTumor)/length(sizeOfOriginalTumor)
  cbind(freqTumor, relFreqTumor)
  
  smoking <- factor(myData$smoking, levels = c('T', 'F'), labels = c('Smokers', 'Non-smokers'))
  freqSmoking <- table(smoking)
  relFreqSmoking <- table(smoking)/length(smoking)
  cbind(freqSmoking, relFreqSmoking)
  
  joint = CrossTable(sizeOfOriginalTumor, smoking, prop.chisq = FALSE)
  
  joint_prop = joint$prop.col
  
  barplot(joint_prop, beside=FALSE, col=rainbow(4, s = .5, end = .6), xlab='Tumor size comparison for Smokers and Non-smokers')
  legend('topright', inset=c(.05, .01), c('Small','Medium', 'Large', 'Very Large'), pch=15, col=rainbow(4, s = .5, end = .6), bty='o', bg='white')
}

compareSurvivalWithSizeOfTumor <- function(myData)
{
  library(gmodels)
  
  sizeOfOriginalTumor <- factor(myData$sizeOfOriginalTumor, levels = c('OC11','OC12', 'OC13', 'OC14'))
  freqTumor <- table(sizeOfOriginalTumor)
  relFreqTumor <- table(sizeOfOriginalTumor)/length(sizeOfOriginalTumor)
  cbind(freqTumor, relFreqTumor)
  
  risk1yr <- factor(myData$risk1yr, levels = c('T', 'F'), labels = c('Died', 'Survived'))
  freqRisk1yr <- table(risk1yr)
  relFreqRisk1yr <- table(risk1yr)/length(risk1yr)
  cbind(freqRisk1yr, relFreqRisk1yr)
  
  joint = CrossTable(sizeOfOriginalTumor, risk1yr, prop.chisq = FALSE)
  
  joint_prop = joint$prop.col
  
  barplot(joint_prop, beside=FALSE, col=rainbow(4, s = .5, start = .2), xlab='Tumor size comparison with the risk of death within 1 year')
  legend('topright', inset=c(.05, .01), c('Small','Medium', 'Large', 'Very Large'), pch=15, col=rainbow(4, s = .5, start = .2), bty='o', bg='white')
}

showFrequencyCharts <- function(mappedData){
  library(ggplot2)
  library(gridExtra)
  
  plot1 <- ggplot(mappedData, aes(x = "", fill=diagnosis)) +
    ggtitle("Diagnosis") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot2 <- ggplot(mappedData, aes(x = "", fill=performanceStatus)) +
    ggtitle("Performance Status") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot3 <- ggplot(mappedData, aes(x = "", fill=painBeforeSurgery)) +
    ggtitle("Pain Before Surgery") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot4 <- ggplot(mappedData, aes(x = "", fill=haemoptysisBeforeSurgery)) +
    ggtitle("Haemoptysis Before Surgery") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot5 <- ggplot(mappedData, aes(x = "", fill=dyspnoeaBeforeSurgery)) +
    ggtitle("Dyspnoea Before Surgery") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot6 <- ggplot(mappedData, aes(x = "", fill=coughBeforeSurgery)) +
    ggtitle("Cough Before Surgery") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot7 <- ggplot(mappedData, aes(x = "", fill=weaknessBeforeSurgery)) +
    ggtitle("Weakness Before Surgery") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot8 <- ggplot(mappedData, aes(x = "", fill=sizeOfOriginalTumor)) +
    ggtitle("Size Of Original Tumor") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot9 <- ggplot(mappedData, aes(x = "", fill=diabetesMellitus)) +
    ggtitle("Diabetes Mellitus") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot10 <- ggplot(mappedData, aes(x = "", fill=smoking)) +
    ggtitle("Smoking") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot11 <- ggplot(mappedData, aes(x = "", fill=risk1yr)) +
    ggtitle("Risk 1 yr") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot12 <- ggplot(mappedData, aes(x = "", fill=miUpTo6months)) +
    ggtitle("MI up to 6 months") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot13 <- ggplot(mappedData, aes(x = "", fill=pad)) +
    ggtitle("PAD") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  plot14 <- ggplot(mappedData, aes(x = "", fill=asthma)) +
    ggtitle("Asthma") +
    xlab("") +
    ylab("Frequency") +
    geom_bar(width = 1) +
    coord_polar("y") +
    scale_fill_brewer(palette="Accent")
  
  
  
  grid.arrange(plot1, ncol=1)
    
  grid.arrange(plot2, ncol=1)
  
  grid.arrange(plot3, ncol=1)
  
  grid.arrange(plot4, ncol=1)
  
  grid.arrange(plot5, ncol=1)
  
  grid.arrange(plot6, ncol=1)
  
  grid.arrange(plot7, ncol=1)
  
  grid.arrange(plot8, ncol=1)
  
  grid.arrange(plot9, ncol=1)
  
  grid.arrange(plot10, ncol=1)
  
  grid.arrange(plot11, ncol=1)
  
  grid.arrange(plot12, ncol=1)
  
  grid.arrange(plot13, ncol=1)
  
  grid.arrange(plot14, ncol=1)
}

showNumericAttributeStats <- function (mappedData){
  colors <- c("darkorange")
  
  summary(mappedData)
  sd(mappedData$fvc)
  sd(mappedData$fev1)
  sd(mappedData$age)
  
  
  plot(mappedData$diagnosis)
  
  hist(mappedData$fvc, 20, col = colors)
  
  hist(mappedData$fev1, 20, col = colors)
  
  hist(mappedData$age, 20, col = colors)
  
  
  plot(mappedData$fvc, mappedData$fev1)
  
  plot(mappedData$fvc, mappedData$age)
  
  plot(mappedData$fev1, mappedData$age)
  
  colors <- c("darkolivegreen1")
  
  boxplot(mappedData$fvc, col = colors)
  
  boxplot(mappedData$fev1, col = colors)
  
  boxplot(mappedData$age, col = colors)
}

runAnalysis <- function (arffFileName){
  library(foreign)
  rawData <- read.arff(arffFileName)
  mappedData <- getMappedData(rawData)
  
  showNumericAttributeStats(mappedData)
  showFrequencyCharts(mappedData)
  
  # outliers
  showOindAnalysis(mappedData)
  dataWithoutOutliers <- getDataWithoutOutliers(mappedData)
   
  numericData <- getNumericData(dataWithoutOutliers)
  normalisedData <- getNormalisedData(numericData)
  drawCovarianceGrid(normalisedData)
   
  compareSmokersWithSizeOfTumor(dataWithoutOutliers)
  compareSurvivalWithSizeOfTumor(dataWithoutOutliers)
   
  factorAnalysis(dataWithoutOutliers)
}

getHistogram <- function(arffFileName){
	library(foreign)
	rawData <- read.arff(arffFileName)
	mappedData <- getMappedData(rawData)

	return(hist(mappedData$age, plot=FALSE))
}

readAndGetData <- function(arffFileName){
	library(foreign)
	rawData <- read.arff(arffFileName)
	mappedData <- getMappedData(rawData)

	return(mappedData)
}