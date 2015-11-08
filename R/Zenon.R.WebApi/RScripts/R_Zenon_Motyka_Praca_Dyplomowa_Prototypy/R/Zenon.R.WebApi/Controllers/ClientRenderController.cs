using System;
using System.Collections.Generic;
using System.IO;
using RDotNet;
using System.Linq;

namespace Zenon.R.WebApi.Controllers
{
    public class ClientRenderController : RApiController
    {
        private static readonly string _rScriptsPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RScripts");

        public IEnumerable<HistogramDataEntry> GetHistogram()
        {
            var explorationScriptPath = GetScriptAbsolutePath("Zenon_Motyka_projekt_eksploracja_danych_kod.R");
            var dataSourcePath = GetScriptAbsolutePath("szklo_B.mat");
            Engine.Evaluate(string.Format("source('{0}', chdir=T)", explorationScriptPath));
            var histData = Engine.Evaluate(string.Format("getHistogram('{0}')", dataSourcePath)).AsList();
            var mappedHistData = histData.Select(d => Mapper.Map(d)).ToArray();
            var histCounts = mappedHistData[3].Values.Zip(mappedHistData[1].Values, (x, y) =>
                new HistogramDataEntry
                {
                    X = double.Parse(x),
                    Count =  int.Parse(y)
                });

            return histCounts;
        }

        public IEnumerable<Point> GetScatterChart()
        {
            var explorationScriptPath = GetScriptAbsolutePath("Zenon_Motyka_projekt_eksploracja_danych_kod.R");
            var dataSourcePath = GetScriptAbsolutePath("szklo_B.mat");
            Engine.Evaluate(string.Format("source('{0}', chdir=T)", explorationScriptPath));
            Engine.Evaluate(string.Format("glassData <- getGlassData('{0}')", dataSourcePath));
            var riData = Engine.Evaluate("glassData$ri").AsList();
            var naData = Engine.Evaluate("glassData$na").AsList();

            var riDataArray = riData.Select(d => Mapper.Map(d).Values.Select(s => double.Parse(s)).First()).ToArray();
            var naDataArray = naData.Select(d => Mapper.Map(d).Values.Select(s => double.Parse(s)).First()).ToArray();

            var result = riDataArray.Zip(naDataArray, (ri, na) => 
                new Point
                {
                    X = ri,
                    Y = na,
                    Size = 0.5
                });

            return result;
        }
    }

    public class HistogramDataEntry
    {
        public double X { get; set; }
        public int Count { get; set; }
    }

    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }
        public double Size { get; set; }
    }
}
