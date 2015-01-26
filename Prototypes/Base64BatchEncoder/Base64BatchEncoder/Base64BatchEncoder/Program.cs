using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Base64BatchEncoder
{
    class Program
    {
        static void Main(string[] args)
        {
            var directoryPath = @"D:\DICOM\Starzynski\1074520\1074520_5mm_anonim\PNG";
            var destinationPath = Path.Combine(directoryPath, "encodedFiles.json");
            var limitResults = 140;
            GenerateSerializedBase64Data(directoryPath, destinationPath, limitResults);
        }

        private static void GenerateSerializedBase64Data(string directoryPath, string destinationPath, int limitResults)
        {
            var dataSerializer = new Base64DataSerializer();
            var batchBase64Encoder = new BatchBase64Encoder();
            var fileSystemAccessor = new FileSystemAccessor();

            var encodedFiles = batchBase64Encoder.Encode(directoryPath, limitResults);
            var result = dataSerializer.Serialize(encodedFiles);

            fileSystemAccessor.SaveToFile(destinationPath, result);
        }
    }

    public class EncodedEntry
    {
        public string Name { get; set; }
        public string Content { get; set; }
    }

    public class FileSystemAccessor
    {
        public byte[] GetBytes(string filePath)
        {
            byte[] filebytes = null;
            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                filebytes = new byte[fs.Length];
                fs.Read(filebytes, 0, Convert.ToInt32(fs.Length));
            }

            return filebytes;
        }

        public IEnumerable<string> GetFilesInDirectory(string directoryPath)
        {
            return Directory.GetFiles(directoryPath);
        }

        public void SaveToFile(string destinationPath, string text)
        {
            File.WriteAllText(destinationPath, text);
        }
    }

    public class Base64Encoder
    {
        public string Encode(byte[] bytes)
        {
            return Convert.ToBase64String(bytes, Base64FormattingOptions.InsertLineBreaks);
        }
    }

    public class BatchBase64Encoder
    {
        public IEnumerable<EncodedEntry> Encode(string directoryPath, int limitResults)
        {
            var fileReader = new FileSystemAccessor();
            var encoder = new Base64Encoder();
            var files = fileReader.GetFilesInDirectory(directoryPath);

            foreach (var filePath in files.Take(limitResults))
            {
                var bytes = fileReader.GetBytes(filePath);
                var entry = new EncodedEntry
                {
                    Name = Path.GetFileNameWithoutExtension(filePath),
                    Content = encoder.Encode(bytes),
                };

                yield return entry;
            }
        }
    }

    public class Base64DataSerializer
    {
        public string Serialize(IEnumerable<EncodedEntry> encodedEntries)
        {
            return JsonConvert.SerializeObject(encodedEntries.Select(e => e.Content).ToList());
        }
    }
}
