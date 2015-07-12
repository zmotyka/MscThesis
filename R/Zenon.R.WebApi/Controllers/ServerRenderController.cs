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

        private readonly string _rScriptsPath;
        private static REngine _engine;
        public ServerRenderController()
        {
            if (_engine != null) return;

            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Libs\\R\\i386");
            SetupEnvironmentPath(path);

            var rDllPath = Path.Combine(path, "R.dll").Replace('\\', '/');
            var rLibrariesPath = Path.Combine(path, "libraries").Replace('\\', '/');
            _engine = REngine.GetInstance(rDllPath);
            _rScriptsPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RScripts");
               
            _engine.Initialize();
            _engine.Install(GraphicsDevice);
            _engine.Evaluate(string.Format(@".libPaths(""{0}"")", rLibrariesPath));
        }

        public string Get()
        {
            GraphicsDevice.ClearImages();

            //var x = _engine.Evaluate("(0:12) * pi / 12").AsNumeric();
            //_engine.SetSymbol("x", x);4
            //var y = _engine.Evaluate("cos(x)").AsNumeric();

            //_engine.Evaluate("library(stats)");
            //var x = _engine.Evaluate("rnorm(100, mean=50, sd=10)").AsNumeric();
            //var hist = _engine.GetSymbol("hist").AsFunction();
            //_engine.SetSymbol("x", x);
            //var result = _engine.Evaluate("hist(x, col=rgb(0,0,1,0.25))");//.AsNumeric();


            var rScriptsDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RScripts");
            var explorationScriptPath = Path.Combine(rScriptsDirectory, "Zenon_Motyka_projekt_eksploracja_danych_kod.R").Replace('\\', '/');
            var dataSourcePath = Path.Combine(rScriptsDirectory, "szklo_B.mat").Replace('\\', '/');
            _engine.Evaluate(string.Format("source('{0}', chdir=T)", explorationScriptPath));
            _engine.Evaluate(string.Format("runAnalysis('{0}')", dataSourcePath));
            //var szkloMatPath = Path.Combine(rScriptsDirectory, "szklo_B.mat").Replace('\\', '/');
            //var rawGlassData = _engine.Evaluate(string.Format(@"readMat(""{0}"")", szkloMatPath));

            var plots = GraphicsDevice.GetImages().Select(RenderSvg).ToList();

            return plots[0];
        }

        protected override void Dispose(bool disposing)
        {
            //_engine.Dispose();
            _engine = null;
            base.Dispose(disposing);
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

        private static void SetupEnvironmentPath(string rDllDirectory)
        {
            var oldPath = System.Environment.GetEnvironmentVariable("PATH");
            if (!Directory.Exists(rDllDirectory))
            {
                throw new DirectoryNotFoundException(string.Format(" R.dll not found in : {0}", rDllDirectory));
            }

            var newPath = string.Format("{0}{1}{2}", rDllDirectory, Path.PathSeparator, oldPath);
            Environment.SetEnvironmentVariable("PATH", newPath);
        }
    }
}
