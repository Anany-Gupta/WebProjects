const puppeteer = require("puppeteer");
const fs = require("fs");
let tab;


let FinalDataSet = [];// Array to store data while scrapping
let StatsJson = [];// Array to Store the Json Objects after Conversion;

// An IIFE function
(async function () {
    await CreateDataSet('https://www.mohfw.gov.in');
    ReportToJson(FinalDataSet);
    await MakeTable();
    await MakeXLXS();
    await sendEmail();
})();
//Function to get data from given Link
async function CreateDataSet(siteLink) {                                   
    //A Non headless browser to Extract the Cases data
    let browser = await puppeteer.launch({                                    

        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],

    });
    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto(siteLink);
    // Waiting for completion of navigation
    await tab.waitForSelector('.trigger-state', { visible: true });
    let StateDataBtn = await tab.$('.trigger-state');
    await tab.waitForTimeout(5000);
    //Navigating to the Data Table
    await StateDataBtn.click();
    await tab.waitForSelector('.data-table.table-responsive tbody tr');
    //Extracting Rows
    let AllTableRows = await tab.$$('.data-table.table-responsive tbody tr');
    for (let i = 0; i < AllTableRows.length - 5; i++) {

        let tr = AllTableRows[i];
        let tdArr = await tr.$$("td");
        let List = [];
        //Extracting data for each state
        for (let j = 0; j < tdArr.length; j++) {

            let tdlink = tdArr[j];
            let value = await tab.evaluate(function (element) { return element.textContent; }, tdlink);
            List.push(value);
        }
        // Appending info of all states into the Array
        FinalDataSet.push(List);
    }
    
    await tab.waitForTimeout(5000);
    //Exiting the browser
    browser.close();
    console.log("Data Scrapped!!!");

}

 //Function to Convert the Array of data into Json File
function ReportToJson(Arr) {                                   
    // Creatine a File to store Data
    let FilePath = "./IndiaDataSet.json";
    let count = 1;
    for (let i = 0; i < Arr.length; i++) {

        let StateStats = {
            Serial: Arr[i][0],
            State_UT: Arr[i][1],
            Total_Cases: Arr[i][2],
            Cases_Yesterday: Arr[i][3],
            Total_Recovered: Arr[i][4],
            Recovered_Yesterday: Arr[i][5],
            Total_Deaths: Arr[i][6],
            Deaths_Yesterday: Arr[i][7],


        }
        count++;

        StatsJson.push(StateStats);

    }

    //Writing the data onto the file
    fs.writeFileSync(FilePath, JSON.stringify(StatsJson));
    console.log("Created JSON file");


}


 //Function to Create html file 
async function MakeTable() {                                   

    //Defining the Header for HTML table
    let Headers = ["S.No.", "State_UT",
        "Total_Cases",
        "Cases_Yesterday",
        "Total_Recovered",
        "Recovered_Yesterday",
        "Total_Deaths",
        "Deaths_Yesterday"];


    //Importing a prewritten snippet of HTML document 
    let htmlstart = fs.readFileSync('./headStart.txt','utf8');
    
    let htmltable = ""
    //Adding Heading to Table
    for (let i = 0; i < Headers.length; i++) {
        htmltable += "<th>" + Headers[i] + "</th>";
    }
    //Adding Row Values to the table
    for (let i = 0; i < FinalDataSet.length; i++) {
        let Row = FinalDataSet[i];
        htmltable += "<tr>"
        for (let j = 0; j < Row.length; j++) {
            htmltable += "<td>" + Row[j] + "</td>";
        }
        htmltable += "</tr>"
    }

    //Completeing the rest of html code
    let htmlend = "</table></body></html>"
    //Creating a HTML document and saving it in parent directory
    fs.writeFileSync("./DisplayDataSet.html", htmlstart + htmltable + htmlend);
    console.log("Created an HTML File");
}

//Function to create an XLSX/EXCLE file 
async function MakeXLXS() {
    //Library used for the conversion 'json2xls'
    let json2xls = require('json2xls');


    let xls = json2xls(StatsJson);

    fs.writeFileSync('IndiaDataSet.xlsx', xls, 'binary');
    console.log("Created XLSX file");

}


//Function to Send Email to User
async function sendEmail() {                                    
    //Reading the EmailId and Password values 
    let id = fs.readFileSync('./UserEmail.txt', 'utf-8');
    let pwd = fs.readFileSync('./Password.txt', 'utf-8').trim();
    
    //Library required to send Mail
    var nodemailer = require("nodemailer");
    
    //Creating a Sender
    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: id,
            pass: pwd
        }
    });
    //Composing the Mail
    var mail = {
        
        from: id,
        to: 'ananygupta@gmail.com',
        subject: "Sending DataSets in different format using Node App",
        text: "First WebAutomation Project",
        
        //Adding Attachment files i.e. the DataSets in different Formats
        attachments: [
            {
                filename: 'IndiaDataSet.json',
                path: __dirname + '\\IndiaDataSet.json',

            },
            {
                filename: 'IndiaDataSet.xlsx',
                path: __dirname + '\\IndiaDataSet.xlsx',

            },
            {
                filename: 'DisplayDataSet.html',
                path: __dirname + '\\DisplayDataSet.html',

            }
        ]
    };
    //Sending the mail
    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully to: "
                + 'ananygupta@gmail.com');
        }
    });
}