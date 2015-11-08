using Svg;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Http;
using System.Linq;

namespace Zenon.R.WebApi.Controllers
{
    public class ServerRenderController : RApiController
    {
        private static readonly string _rScriptsPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RScripts");

        public IEnumerable<string> Get()
        {
            GraphicsDevice.ClearImages();
            
            var explorationScriptPath = GetScriptAbsolutePath("Zenon_Motyka_analiza_thoraric_surgery.R");
            var dataSourcePath = GetScriptAbsolutePath("ThoraricSurgery.arff.txt");
            Engine.Evaluate(string.Format("source('{0}', chdir=T)", explorationScriptPath));
            Engine.Evaluate(string.Format("runAnalysis('{0}')", dataSourcePath));

            var plots = GraphicsDevice.GetImages().Select(RenderSvg).Distinct().ToList();

            return plots;
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
        }
    }
}
