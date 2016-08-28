'use strict'
app.controller('invoiceCtrl', invoiceController);

invoiceController.$inject = ['$scope'];

function invoiceController( $scope ) {
  const iCtrl = this;
  iCtrl.title = 'Invoice Controller';

  iCtrl.invoice = {};

  iCtrl.invoice.laborTotal = '150.00'
  iCtrl.invoice.partsTotal = '0.00'
  iCtrl.invoice.subtotal = '159.75'
  iCtrl.invoice.taxPercent = '0.065'
  iCtrl.partsTaxTotal = '0.00'
  iCtrl.invoice.shopSupplies = '8.25'
  iCtrl.invoice.shopSuppliesPercent = '0.055'
  iCtrl.invoice.hazardousMaterials = '0.00'
  iCtrl.invoice.date = new Date();

  iCtrl.disclaimer = '"Any warranties on the products sold hereby are those made by the manufacturer.' +
    ' The seller, RACALLS AUTOTECHS LLC, hereby expressly disclaims all warranties, either express or implied,' +
    ' including any implied warranty of merchantability or fitness for a particular purpose, and neither assumes' +
    ' nor authorizes any other person to assume for it any liability in connection with the sale of said products."' +
    ' NOTICE: You are entitled to inspect or receive any components, parts, or accessories replaced or removed by the shop.'

  iCtrl.invoice.company = {
    name : 'Racalls Autotechs',
    address : {
      street : '1234 N 1st St',
      city : 'Racine',
      state : 'Wisconsin',
      zip : '55555'
    },
    phone : '(414) 123-1234',
    logo : '../images/logo.png'
  }

  iCtrl.invoice.customer = {
    name : 'Joe Smith',
    address : '1234 S 1st St Milwaukee, WI 53215',
    phone : '(414) 456-7891'
  }

  iCtrl.invoice.headers = [{
    title: 'TYPE'
  },{
    title: 'DESCRIPTION'
  },{
    title: 'PART #'
  },{
    title: 'QTY'
  },{
    title: 'PRICE'
  },{
    title: 'RATE'
  },{
    title: 'HOURS'
  },{
    title: 'LINE TOTAL'
  }];

  iCtrl.invoice.lineItems = [{
    type: 'Labor',
    description : 'Repair',
    partNumber : '',
    quantity : '',
    price : '',
    rate : '50.00',
    hours : '3.0',
    lineTotal : '150.00'
  }];

  iCtrl.invoice.notes = [{
    title : 'Some title',
    description : 'Some description'
  }]

  iCtrl.calcTotal = function( data, line, method ) {
    let total = 0;
    switch(method) {
      case 'quantity' :
        total = data * line.price
        break;
      case 'price' :
        total = data * line.quantity
        break;
      case 'rate' :
        total = data * line.hours
        break;
      case 'hours' :
        total = data * line.rate
        break;
      case 'misc' :
        break;
    }
    if (method !== 'misc') {
      line.lineTotal = total;
    }
    iCtrl.getTotalLabor();
    iCtrl.getTotalParts();
    iCtrl.getTotalShopSupplies();
    iCtrl.getPartsTax();
    iCtrl.getSubtotal();
    return true;
  }

  iCtrl.newLine = function( ) {
    iCtrl.invoice.lineItems.push({
      type: 'Labor',
      description : 'Repair',
      partNumber : '',
      quantity : '',
      price : '',
      rate : '',
      hours : '',
      lineTotal : ''
    })
  }

  iCtrl.removeLine = function( line ) {
    iCtrl.invoice.lineItems.splice(iCtrl.invoice.lineItems.indexOf(line),1);
    iCtrl.calcTotal(null,null,'misc');
  }

  iCtrl.newNote = function( ) {
    iCtrl.invoice.notes.push({
      title : 'New Title',
      description : 'New note description'
    })
  }

  iCtrl.removeNote = function( note ) {
    iCtrl.invoice.notes.splice(iCtrl.invoice.notes.indexOf(note),1)
  }

  iCtrl.getTotalLabor = function( ) {
    let total = 0;
    for ( let i = 0; i < iCtrl.invoice.lineItems.length; i++ ) {
      if (iCtrl.invoice.lineItems[i].type === "Labor") {
        total += parseFloat(iCtrl.invoice.lineItems[i].lineTotal);
      }
    }
    iCtrl.invoice.laborTotal = total;
    if ( total === 0 ) {
      return '-';
    }
  }

  iCtrl.getTotalParts = function( ) {
    let total = 0;
    for ( let i = 0; i < iCtrl.invoice.lineItems.length; i++ ) {
      if (iCtrl.invoice.lineItems[i].type === "Parts") {
        total += parseFloat(iCtrl.invoice.lineItems[i].lineTotal);
      }
    }
    iCtrl.invoice.partsTotal = total;
    if ( total === 0 ) {
      return '-';
    }
  }

  iCtrl.getTotalShopSupplies = function( ) {
    let total = 0;
    let totalLabor = 0;
    for ( let i = 0; i < iCtrl.invoice.lineItems.length; i++ ) {
      if (iCtrl.invoice.lineItems[i].type === "Labor") {
        totalLabor += iCtrl.invoice.lineItems[i].lineTotal;
      }
    }
    total = totalLabor * iCtrl.invoice.shopSuppliesPercent;
    if ( total === 0 ) {
      return '-';
    } else iCtrl.invoice.shopSupplies = total;
  }

  iCtrl.getPartsTax = function( ) {
    let total = 0;
    for ( let i = 0; i < iCtrl.invoice.lineItems.length; i++ ) {
      if (iCtrl.invoice.lineItems[i].type === "Parts") {
        total += iCtrl.invoice.lineItems[i].lineTotal;
      }
    }
    if ( total === 0 ) {
      iCtrl.invoice.partsTaxTotal = '0.00'
    } else { iCtrl.invoice.partsTaxTotal = total * parseFloat(iCtrl.invoice.taxPercent); }
  }

  iCtrl.getSubtotal = function( ) {
    console.log(iCtrl.invoice)
    iCtrl.invoice.subtotal = parseFloat(iCtrl.invoice.partsTotal) + parseFloat(iCtrl.invoice.laborTotal) + parseFloat(iCtrl.invoice.partsTaxTotal) + parseFloat(iCtrl.invoice.shopSupplies) + parseFloat(iCtrl.invoice.hazardousMaterials);
  }

  iCtrl.printInvoice = function() {
    window.print();
  }

}
