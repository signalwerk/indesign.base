class file {
  base(inFile) {
    return new File(inFile).parent;
  }

  remove(inFile) {
    var finalFile = inFile;

    if (inFile.constructor.name == "String") {
      finalFile = File(inFile);
    }

    if (finalFile.exists) {
      finalFile.remove();
      return true;
    } else {
      return false;
    }
  }

  exists(inFile) {
    var finalFile = inFile;

    if (inFile.constructor.name == "String") {
      finalFile = File(inFile);
    }

    if (finalFile.exists) {
      return true;
    } else {
      return false;
    }
  }

  write(path, str, strEncoding, strLineFeed) {
    var finalFile = path;

    if (path.constructor.name == "String") {
      finalFile = File(path);
    }

    var encoding = strEncoding || "UTF-8"; // "UTF-16LE" "BINARY"
    var lineFeed = strLineFeed || "Unix"; // "Unix" "Windows" "Macintosh"

    finalFile.lineFeed = lineFeed;

    if (File.isEncodingAvailable(encoding)) {
      finalFile.encoding = encoding;
    } else {
      console.error("The File Encoding was not aviable. Encoding: " + encoding);
    }

    finalFile.open("w");

    if (finalFile !== "") {
      finalFile.write(str);
      finalFile.close();
      return true;
    } else {
      console.error(filepath);
    }

    return false;
  }
}

export default file;
