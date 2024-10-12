import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 2000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "timely",
    password: "Castlew14",
    port: 5432,
})

db.connect();

let matters = [];
let existBilling = [];
let wipData = [];
let test = 1234;

db.query("SELECT * FROM public.matter_data ORDER BY matter_number ASC", (err, res) => {
    if (err) {
        console.log("Error executing query", err.stack);
    } else {
        matters = res.rows;
    }
})

db.query("SELECT * FROM public.existing_billings ORDER BY matter_number ASC ", (err, res) => {
    if (err) {
        console.log("Error executing query", err.stack);
    } else {
        existBilling = res.rows;
    }
})

db.query("SELECT * FROM public.wip ORDER BY matter_number ASC", (err, res) => {
    if (err) {
        console.log("Error executing query", err.stack);
    } else {
        wipData = res.rows;
    }
})


// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/getData", async (req, res) => {

    const matNum = req.body['matterNumber'];

    const foundMatter = matters.find(m => m.matter_number === matNum);
    const feeEarner = foundMatter ? foundMatter.fee_earner : null;
    const dept = foundMatter ? foundMatter.department : null;
    const matName = foundMatter ? foundMatter.matter_name : null;


    const foundBillings = existBilling.find(e => e.matter_number === matNum);
    const workfees = foundBillings ? foundBillings.worked_fees : null;
    const billfees = foundBillings ? foundBillings.billed_fees : null;
    const costs = foundBillings ? foundBillings.costs : null; 

    const foundInvoice = wipData.find(w => w.matter_number === matNum);
    const workfeesInvoice = foundInvoice ? foundInvoice.worked_fees : null;
    const costsInvoice = foundInvoice ? foundInvoice.costs : null; 

    const dataToPass = {
        matNumberC: matNum,
        feeEarnerC: feeEarner,
        deptC: dept,
        matNameC: matName,
        workfeesC: workfees,
        billfeesC: billfees,
        costsC: costs,
        workfeesInvoiceC: workfeesInvoice,
        costsInvoiceC: costsInvoice,
        testC: test, 
    };


    res.render("index.ejs", {
        matNumberC: matNum,
        feeEarnerC: feeEarner,
        deptC: dept,
        matNameC: matName,
        workfeesC: workfees,
        billfeesC: billfees,
        costsC: costs,
        workfeesInvoiceC: workfeesInvoice,
        costsInvoiceC: costsInvoice,
    });
});




app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});