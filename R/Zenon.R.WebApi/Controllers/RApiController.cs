using RDotNet;
using RDotNet.Graphics;
using Svg;
using System;
using System.IO;
using System.Web.Http;
using Zenon.R.WebApi.Models;

namespace Zenon.R.WebApi.Controllers
{
    public class RApiController : ApiController
    {
        protected static readonly SvgGraphicsDevice GraphicsDevice = new SvgGraphicsDevice(new SvgContextMapper(500, 500, SvgUnitType.Pixel, null));
        protected static readonly CharacterDevice CharacterDevice = new CharacterDevice();
        protected static readonly SymbolicExpressionToResultMapper Mapper = new SymbolicExpressionToResultMapper();

        protected static REngine Engine;

        public RApiController()
        {
            if (Engine != null) return;

            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Libs\\R\\i386");
            SetupEnvironmentPath(path);

            var rDllPath = Path.Combine(path, "R.dll").Replace('\\', '/');
            var rLibrariesPath = Path.Combine(path, "libraries").Replace('\\', '/');
            Engine = REngine.GetInstance(rDllPath);
               
            Engine.Initialize();
            Engine.Install(GraphicsDevice);
            Engine.Evaluate(string.Format(@".libPaths(""{0}"")", rLibrariesPath));
        }

        protected string GetScriptAbsolutePath(string scriptFileName)
        {
            var rScriptsDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RScripts");
            var scriptPath = Path.Combine(rScriptsDirectory, scriptFileName).Replace('\\', '/');
            return scriptPath;
        }

        protected override void Dispose(bool disposing)
        {
            Engine = null;
            base.Dispose(disposing);
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
