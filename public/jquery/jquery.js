

const deptName = document.getElementById('deptName');
const matterName = document.getElementById('matterName');
const feeEarner = document.getElementById('feeEarner');
const matterNumber = document.getElementById('matterNumber');

deptName.value = deptC;
matterName.value = matNameC;
feeEarner.value = feeEarnerC;
matterNumber.value = matNumberC;

const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

// Existing Billing Data

const existWorkVal = document.getElementById('existWorkVal');
const existBilVal = document.getElementById('existBilVal');
const existBilCost = document.getElementById('existBilCost');
const writeDown = document.getElementById('writeDown');
const cpReal = document.getElementById('cp£');
const cpPerc = document.getElementById('cp%');

existWorkVal.value = formatter.format(workfeesC);
existBilVal.value = formatter.format(billfeesC);
existBilCost.value = formatter.format(costsC);

var num = Number(billfeesC) / Number(workfeesC)
num = Math.round(100-(num*100));
writeDown.value = num + "%";

const profit = Number(billfeesC) - Number(costsC);
cpReal.value = formatter.format(profit);
cpPerc.value = Math.round((profit / Number(billfeesC)) * 100) + "%";

// Invoice Data

var invoiceWorkVal = document.getElementById('invoiceWorkVal');
var invoiceBilCost = document.getElementById('invoiceBilCost');
var invoiceBilVal = document.getElementById('invoiceBilVal');
const InvCpR = document.getElementById('InvCpR');
const InvCpP = document.getElementById('InvCpP');

invoiceWorkVal.value = formatter.format(workfeesInvoiceC);
invoiceWriteDown.value = 100-Math.round((Number(workfeesInvoiceC) / Number(workfeesInvoiceC))*100) + "%";
invoiceBilVal.value = invoiceWorkVal.value;
invoiceBilCost.value = formatter.format(costsInvoiceC);
const profit2 = Number(JSON.parse(workfeesInvoiceC) - JSON.parse(costsInvoiceC))
InvCpR.value = formatter.format(profit2);
InvCpP.value = Math.round((profit2 / JSON.parse(workfeesInvoiceC)) * 100) + "%";

// Total Data

var totalWorkVal = document.getElementById('totalWorkVal');
var totalWriteDown = document.getElementById('totalWriteDown');
var totalBilVal = document.getElementById('totalBilVal');
var totalBilCost = document.getElementById('totalBilCost');
var TotCpR = document.getElementById('TotCpR');
var TotCpP = document.getElementById('TotCpP');

var totalWorkValCalc = Number(workfeesInvoiceC) + Number(workfeesC);
totalWorkVal.value = formatter.format(totalWorkValCalc);

var totalBilValCalc = Number(workfeesInvoiceC) + Number(billfeesC);
totalBilVal.value = formatter.format(totalBilValCalc);

totalWriteDown.value = Math.round(( 1 - totalBilValCalc / totalWorkValCalc ) * 100) + "%";

var totalBilCostCalc = Number(costsInvoiceC) + Number(costsC);
totalBilCost.value = formatter.format(totalBilCostCalc);
var totalProfitCalc = totalBilValCalc - totalBilCostCalc;
TotCpR.value = formatter.format(totalProfitCalc);
TotCpP.value = Math.round((totalProfitCalc / totalBilValCalc) * 100) + "%";









