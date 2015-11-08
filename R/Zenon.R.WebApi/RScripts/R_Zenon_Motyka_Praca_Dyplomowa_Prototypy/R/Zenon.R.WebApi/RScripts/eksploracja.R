


podziel_md1 = function(md_m,md_c, p)
{
   ile <- length(md_c)
   los <- sample(1:ile,size = p*ile)
   md1 <- list(opis_ucz = md_m[los,], dec_ucz = md_c[los], opis_test = md_m[-los,], dec_test = md_c[-los])
}

podziel_md = function(md, p, typ)
{
 if (typ) # typ == 1
  {
   ile_klas = length(table(md$c)) # liczba klas
   md_wy <- podziel_md1(md$m[md$c==1,],md$c[md$c==1],p)
   for (i in 2:ile_klas)
    {
     md_tmp = podziel_md1(md$m[md$c==i,],md$c[md$c==i],p)
	 md_wy$opis_ucz = rbind(md_wy$opis_ucz, md_tmp$opis_ucz)
	 md_wy$dec_ucz = c(md_wy$dec_ucz, md_tmp$dec_ucz)
	 md_wy$opis_test = rbind(md_wy$opis_test, md_tmp$opis_test)
	 md_wy$dec_test = c(md_wy$dec_test, md_tmp$dec_test)	
    }
  }
 else # typ == 0
  {
    md_wy <- podziel_md1(md$m,md$c,p) 
  }
  md_wy
}

sklej_md = function(md)
{
 md_wy = list(m = rbind(md$opis_ucz,md$opis_test), c = c(md$dec_ucz,md$dec_test))
}

pokaz_md = function (md)
{
 s = srednie_md(md)
 if (is.null(md$opis_ucz)) # macierz typu md
  {
   plot(md$m[,1],md$m[,2],col=md$c,pch=16) 
  }
  else  # macierz md po podziale funkcj¹ podziel_md
  {
      plot(md$opis_ucz[,1],md$opis_ucz[,2],col=md$dec_ucz,pch=16) 
      points(md$opis_test[,1],md$opis_test[,2],col=md$dec_test) 
  }
  points(s[,1],s[,2],pch=8,col=1:length(s[,1]))
}

srednie_md = function (md)
{
 if (is.null(md$opis_ucz)) # macierz typu md
  {
     ile_klas = length(table(md$c)) # liczba klas
     srednie_md <- colMeans(md$m[md$c==1,])
     for (i in 2:ile_klas)
     { 
	  srednie_md <- rbind(srednie_md, colMeans(md$m[md$c==i,]))
	 }
  }
  else # macierz md po podziale funkcj¹ podziel_md
  {
     ile_klas = length(table(md$dec_ucz)) # liczba klas
     srednie_md <- colMeans(md$opis_ucz[md$dec_ucz==1,])
     for (i in 2:ile_klas)
     { 
	  srednie_md <- rbind(srednie_md, colMeans(md$opis_ucz[md$dec_ucz==i,]))
	 }
  }
  srednie_md
 }
 
 
mins_md = function (md)
{
     ile_klas = length(table(md$c)) # liczba klas
     mins_md <- colMins(md$m[md$c==1,])
     for (i in 2:ile_klas)
     { 
	  mins_md <- rbind(mins_md, colMins(md$m[md$c==i,]))
	 }
	 mins_md
}

maxs_md = function (md)
{
     ile_klas = length(table(md$c)) # liczba klas
     mins_md <- colMaxs(md$m[md$c==1,])
     for (i in 2:ile_klas)
     { 
	  mins_md <- rbind(mins_md, colMaxs(md$m[md$c==i,]))
	 }
	 mins_md
}

klasyfikuj = function(typ, md, wekt, k)
{
 if (typ == 'knn')
 {
  wyj = knn(md$opis_ucz,wekt,md$dec_ucz, k)
 }
  if (typ == 'np')
 {
  s = srednie_md(md)
  wyj = knn(s,wekt,1:length(table(md$dec_ucz)), 1)
 }
 if (typ == 'bayes')
 {
	  b <- naiveBayes(md$opis_ucz,md$dec_ucz)
	  wekt1 <- as.matrix(wekt)
	  dimnames(wekt1) <- NULL
	  w <- predict(b,wekt1,type='raw')
	  wyj <- apply(w,1,function(x) which.max(x))

 }
 if (typ == 'drzewo')
 {
     md2 <- data.frame(opis = md$opis_ucz, dec = as.factor(md$dec_ucz)) 
	 tc <- ctree_control(minsplit = k, minbucket = 1, mincriterion = 0.95) #, teststat = "max", testtype = "Teststatistic")
	 dt <- ctree( dec ~ opis.1 + opis.2, data = md2, controls = tc)
	 wekt1 <- data.frame(opis.1 = wekt[,1], opis.2 = wekt[,2])
     w <- predict(dt,wekt1)
	 wyj <- as.numeric(w)	
	 print(dt)
 }
 wyj
}

granice_dec <- function (typ, md, k = 1)
{
  s = srednie_md(md)

  md2 = sklej_md(md)
  mi = mins_md(md2)
  ma = maxs_md(md2)
  mi = colMins(mi)
  ma = colMaxs(ma)
  krok = 0.5
  s1 = seq(mi[1]-5,ma[1]+5,krok)
  s2 = seq(mi[2]-5,ma[2]+5,krok)
  g = expand.grid(s1,s2)
  klas = klasyfikuj(typ, md, g, k)
  #cat(klas)
  plot(g[,1],g[,2],col=klas,pch='.')
  points(md$opis_ucz[,1],md$opis_ucz[,2],col=md$dec_ucz,pch=16) 
  points(md$opis_test[,1],md$opis_test[,2],col=md$dec_test)  
  points(s[,1],s[,2],pch=8,col=1:length(s[,1])) 
}

weryfikacja <- function (typ, md, dane_test, dane_test_dec, k = 1)
{

 if (typ == 'knn')
 {
  wyj = knn(md$opis_ucz, dane_test,md$dec_ucz, k)
 }
 if (typ == 'np')
 {
  s = srednie_md(md)
  wyj = knn(s, dane_test,1:length(table(md$dec_ucz)), 1)
 }
 if (typ == 'bayes')
 {
	  b <- naiveBayes(md$opis_ucz,md$dec_ucz)
	  wekt1 <- as.matrix(dane_test)
	  dimnames(wekt1) <- NULL
	  w <- predict(b,wekt1,type='raw')
	  wyj <- apply(w,1,function(x) which.max(x))
 }
 if (typ == 'drzewo')
 {
     md2 <- data.frame(opis = md$opis_ucz, dec = as.factor(md$dec_ucz)) 
	 tc <- ctree_control(minsplit = k, minbucket = 1, mincriterion = 0.95) #, teststat = "max", testtype = "Teststatistic")
	 dt <- ctree( dec ~ opis.1 + opis.2, data = md2, controls = tc)
	 wekt1 <- data.frame(opis.1 = dane_test[,1], opis.2 = dane_test[,2])
     w <- predict(dt,wekt1)
	 wyj <- as.numeric(w)	
	 plot(dt)
	 #print(w)
 }
 table(dane_test_dec,wyj)
}

weryfikuj <- function (typ, md, k = 1)
{
  print("Weryfikacja klasfikatora", quote=F)
  print("  zbiór ucz¹cy", quote = F)
  print(weryfikacja(typ, md, md$opis_ucz, md$dec_ucz, k))
  print("  zbiór testowy", quote = F)
  print(weryfikacja(typ, md, md$opis_test, md$dec_test, k))
}

wgraj_pakiety <- function(k = 1)
{
 print("wgrywam pakiety", quote=F)
 library(R.matlab)
 library(psych)
 library(raster)
 library(stats)
 library(scatterplot3d)
 library(class)
 library(matrixStats)
 library(e1071)
 library(party)
}

wgraj_pakiety()