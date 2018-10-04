const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.post('/pdfcsv', (req, res) => {
    // fonts = {
    //     Roboto: {
    //         normal: './fonts/Roboto-Regular.ttf',
    //         bold: './fonts/Roboto-Medium.ttf',
    //         italics: './fonts/Roboto-Italic.ttf',
    //         bolditalics: './fonts/Roboto-Bold.ttf'
    //     }
    // };


    // var PdfPrinter = require('pdfmake/src/printer');
    // var printer = new PdfPrinter(fonts);
    // var fs = require('fs');


    // var fs = require('fs');


    // var dd = {
    //     content: [
    //         'First paragraph',
    //         'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    //     ]
        
    // }

    // var pdfDoc = printer.createPdfKitDocument(dd);
    // pdfDoc.pipe(fs.createWriteStream('OnlinePrint.pdf')).on('finish',function(){
    //     console.log("success");
    // });
    // pdfDoc.end();

    // function createPdfBinary(pdfDoc, callback) {

        // var fontDescriptors = {
        //     Roboto: {
        //         normal: './fonts/Roboto-Regular.ttf',
        //         bold: './fonts/Roboto-Medium.ttf',
        //         italics: './fonts/Roboto-Italic.ttf',
        //         bolditalics: './fonts/Roboto-Bold.ttf'
        //     }
        // };
        // var pdfMakePrinter = require('pdfmake/src/printer');
        // var printer = new pdfMakePrinter(fontDescriptors);
        
        // var doc = printer.createPdfKitDocument(pdfDoc);
        
        // var chunks = [];
        // var result;
        
        // doc.on('data', function (chunk) {
        //     chunks.push(chunk);
        // });
        // doc.on('end', function () {
        //     result = Buffer.concat(chunks);
        //     callback('data:application/pdf;base64,' + result.toString('base64'));
        // });
        // doc.end();
        
        // }
        
        // var dd = {
        //     content: [
        //         'First paragraph',
        //         'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        //     ]
            
        // }
        
        
        // createPdfBinary(dd, function(binary) {
        //     res.contentType('application/pdf');
        //     res.send(binary);
        // }, function(error) {
        //     res.send('ERROR:' + error);
        // });


        function objectToCsv(data) {
            const csvRows = []

            const headers = Object.keys(data[0])
            csvRows.push(
                `Report Of The Daily Operating Time \n 
                Plate Number: 'khahara'
                From: 33333
                To: 11111111 \n` )

            csvRows.push(headers.join(','))
            // console.log('data', data)
            for (const row of data) {
                const values = headers.map(header => {
                        // we might need to handle if it contains a quote
                        // then Wrap with quotes
                        // handles the comma in coordinates
                        return ("\"" + row[header] + "\"")
                })
                // console.log('values', values)
                csvRows.push(values.join(','))
            }
            //join each array with the next line
            return csvRows.join('\n')
        }

        let trips = ['nepal', 'bipin', 'shrestha', 00, 99 ,88]

        const objectData = trips.map(trip => {
            return ({
                'Start Date': trip,	
                'End Date': trip,	
                'Operating Hours': trip, 
                'Distance(km)': trip, 
                'Starting Point':  trip, 
                'Reached Point': trip, 
            })
        })
        const csvData = objectToCsv(objectData)

        res.send(csvData)

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})