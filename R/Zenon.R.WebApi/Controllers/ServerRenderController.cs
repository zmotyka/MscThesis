using RDotNet;
using Svg;
using System;
using System.IO;
using System.Linq;
using System.Web.Http;
using Zenon.R.WebApi.Models;
using RDotNet.Graphics;
using System.Drawing.Imaging;

namespace Zenon.R.WebApi.Controllers
{
    public class ServerRenderController : ApiController
    {
        private static readonly SvgGraphicsDevice GraphicsDevice = new SvgGraphicsDevice(new SvgContextMapper(700, 700, SvgUnitType.Pixel, null));
        private static readonly CharacterDevice CharacterDevice = new CharacterDevice();
        private static readonly SymbolicExpressionToResultMapper Mapper = new SymbolicExpressionToResultMapper();

        private static REngine _engine;
        public ServerRenderController()
        {
            if (_engine != null) return;

            var path = @"C:\Program Files\R\R-3.2.1\bin\i386";
            //var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Libs/R/i386");
            var rLibrariesDirectory = Path.Combine(path, "libraries");
            //var rLibrariesDirectory = @"F:\Projects\Git\MscThesis\R\Zenon.R.WebApi\Libs\R\i386\libraries";
            var rScriptsDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RScripts");
            REngine.SetDllDirectory(path);

            _engine = REngine.CreateInstance(Guid.NewGuid().ToString());

            // requires installation of R for windows
            _engine.Initialize();
            _engine.Install(GraphicsDevice);
            _engine.Evaluate(@".libPaths(""C:/Program Files/R/R-2.15.0/library"")");
        }

        public string Get()
        {
            GraphicsDevice.ClearImages();


            //foreach (string p in engine.Evaluate(".libPaths()").AsCharacter())
            //{
            //   var test = p;
            //}


            var x = _engine.Evaluate("(0:12) * pi / 12").AsNumeric();
            _engine.SetSymbol("x", x);
            var y = _engine.Evaluate("cos(x)").AsNumeric();

            //var bmi = engine.Evaluate(@"bmi <- rnorm(n=1000, m=24.2, sd=2.2)");
            //var hist = engine.GetSymbol("hist").AsFunction();
            _engine.SetSymbol("y", y);
            //var result = _engine.Evaluate("hist(y)");
            var result = _engine.Evaluate("hist(y, col=rgb(0,0,1,0.25))");//.AsNumeric();
            //var result = _engine.Evaluate("hist(y, freq=FALSE, xlab=\"Body Mass Index\", main=\"Distribution of Body Mass Index\", col=\"lightgreen\", xlim=c(15,35),  ylim=c(0, .20))");//.AsNumeric();
            //var result = _engine.Evaluate("hist(y, freq=FALSE, xlab=”Body Mass Index”, main=”Distribution of Body Mass Index”, col=”lightgreen”, xlim=c(15,35),  ylim=c(0, .20))");//.AsNumeric();

            //var value = hist.Invoke(new[] { y });

            //engine.Evaluate("library(R.matlab)");

            //var explorationScriptPath = Path.Combine(rScriptsDirectory, "eksploracja.R");
            //var evaluated = engine.Evaluate(string.Format("source('{0}')", explorationScriptPath));
            //engine.Evaluate(@"library(R.matlab)");
            //var rawGlassData = _engine.Evaluate(@"readMat(""szklo_B.mat"")");

            var plots = GraphicsDevice.GetImages().Select(RenderSvg).ToList();

            return plots[0];
        }

        private static string RenderSvg(SvgDocument image)
        {
            using (var testStream = new MemoryStream())
            {
                image.Write(testStream);
                testStream.Position = 0;
                using (var reader = new StreamReader(testStream))
                {
                    var contents = reader.ReadToEnd();
                    return contents;
                }
            }

            //var bitmap = image.Draw();
            //using (var stream = new MemoryStream())
            //{
            //    bitmap.Save(stream, ImageFormat.Png);

            //    return stream.ToArray();
            //}
        }
        
    }
}
