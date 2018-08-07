(function(_s) {

    // constructors
    _s._pdf = klass(function(parent) {
        this.parent = parent;
    });

    _s._pdf.methods({

        setInteractivePDFSettings: function() {


            app.interactivePDFExportPreferences.pageRange = PageRange.ALL_PAGES;
            app.interactivePDFExportPreferences.exportReaderSpreads = false;
            app.interactivePDFExportPreferences.viewPDF = false;
            app.interactivePDFExportPreferences.generateThumbnails = false;
            app.interactivePDFExportPreferences.exportLayers = false;
            app.interactivePDFExportPreferences.includeStructure = true;
            app.interactivePDFExportPreferences.pdfMagnification = PdfMagnificationOptions.DEFAULT_VALUE;
            app.interactivePDFExportPreferences.pdfPageLayout = PageLayoutOptions.TWO_UP_FACING;
            app.interactivePDFExportPreferences.openInFullScreen = false;
            app.interactivePDFExportPreferences.flipPages = false;
            app.interactivePDFExportPreferences.flipPagesSpeed = 5;
            app.interactivePDFExportPreferences.pageTransitionOverride = PageTransitionOverrideOptions.FROM_DOCUMENT;
            app.interactivePDFExportPreferences.interactivePDFInteractiveElementsOption = InteractivePDFInteractiveElementsOptions.INCLUDE_ALL_MEDIA;
            app.interactivePDFExportPreferences.pdfRasterCompression = PDFRasterCompressionOptions.JPEG_COMPRESSION;
            app.interactivePDFExportPreferences.pdfJPEGQuality = PDFJPEGQualityOptions.HIGH;
            app.interactivePDFExportPreferences.rasterResolution = RasterResolutionOptions.ONE_HUNDRED_FORTY_FOUR_PPI;
            app.interactivePDFExportPreferences.usePDFStructureForTabOrder = true;

            return true;

        },





        output: function(inFile, preset) {

            var finalFile = inFile;

            if (inFile.constructor.name == "String") {
                finalFile = File(inFile);
            }

            var myDoc = this.parent.doc();


            // export pdf
            // var myPDFExportPreset = app.pdfExportPresets.item("prepress");
            var myPDFExportPreset = app.pdfExportPresets.item(preset);
            myDoc.exportFile(ExportFormat.pdfType, finalFile, false, myPDFExportPreset);


            return true
        }


    });





    return _s;

}(this.signalwerk || {}));
