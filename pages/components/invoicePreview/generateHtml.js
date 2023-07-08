import React from "react";

export const generateHTML = (invoiceDetails, template) => {
    switch (template) {
        case 'template1':
            return template1(invoiceDetails);
        case 'template2':
            return template2(invoiceDetails);
        case 'template3':
            return template3(invoiceDetails);
        default:
            throw new Error('Invalid template selected.');
    }
};
const template1 = (invoiceDetails) => {
    const {
        documentNumber,
        documentType,
        validFrom,
        validUntil,
        customer,
        products,
        bankAccount,
        currency,
        paymentMethod,
        employee,
        summary,
        companyDetails
    } = invoiceDetails;
    return `
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            table {
                width: 100%;
                font-family: -apple-system, "San Francisco", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
                font-size: 1.1em;
                border-collapse: separate;
                border-spacing: 0 1em;
                text-align: center;
            }
            table thead {
                font-weight: normal;
                font-size: 1rem;
                color: rgba(27, 27, 27, 0.5);
                padding: 1em 0;
                background-color: #fafafa;
                text-align: center;
            }
            table td {
                padding-top: 2em;
                text-align: center;
                margin: 0;
            }
            table td hr {
                margin: 0;
                padding: 0;
            }
            .checkbox {
                display: flex;
                flex-direction: row;
                justify-content: center;
                padding-top: 1.5em;
                font-size: 1em;
                padding-right: 1em;
            }
            .checkbox input {
                width: 1em;
                height: 1em;
                accent-color: rgba(99, 99, 99, 0.5);
                border-color: rgba(40, 40, 40, 0.5);
                margin: auto;
            }
            .select {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.1em;
            }
            table tfoot td {
                font-weight: normal;
                font-size: 1rem;
                color: rgba(27, 27, 27, 0.5);
                padding: 1em 0;
                background-color: #fafafa;
                text-align: center;
            }
            .invoice-wrapper {
                width: 100%;
                margin: 0 auto;
                font-family: Arial, sans-serif;
            }

            .invoice-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }

            .invoice-header-left {
            }

            .invoice-title {
                margin: 0;
            }

            .invoice-date {
                margin: 0;
            }

            .invoice-header-right {
            }

            .invoice-company-details {
                list-style-type: none;
                padding: 0;
            }

            .invoice-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }

            .invoice-info-company {
            }

            .invoice-info-customer {
            }

            .invoice-info-details {
                list-style-type: none;
                padding: 0;
            }

            .invoice-table-wrapper {
            }

            .invoice-table {
                width: 100%;
                text-align: left;
                border-collapse: collapse;
            }

            .invoice-payment-details {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="invoice-wrapper">
            <div class="invoice-header">
                <div class="invoice-header-left">
                    <h1 class="invoice-title">${documentType} <small>${documentNumber}</small></h1>
                    <h4 class="invoice-date">Valid From: ${validFrom}</h4>
                </div>
                <div class="invoice-header-right">
                    <ul class="invoice-company-details">
                        <li><strong>${companyDetails.firmName}</strong></li>
                        <li>${companyDetails.city},${companyDetails.country}</li>
                        <li>${companyDetails.postalCode},${companyDetails.address}</li>
                        <li>${employee.email}</li>
                    </ul>
                </div>
            </div>
            <div class="invoice-info">
                <div class="invoice-info-company">
                    <h3>Company Details</h3>
                    <ul class="invoice-info-details">
                        <li><strong>Name: </strong> ${companyDetails.firmName}</li>
                        <li><strong>Address: </strong> ${companyDetails.address}</li>
                        <li><strong>Phone: </strong> ${employee.phoneNumber}</li>
                        <li><strong>Email: </strong> ${employee.email}</li>
                        <li><strong>Contact: </strong> ${employee.firstName} ${employee.lastName}</li>
                    </ul>
                </div>
                <div class="invoice-info-customer">
                    <h3>Customer Details</h3>
                    <ul class="invoice-info-details">
                        <li><strong>Name: </strong> ${customer ? customer.name : ''}</li>
                        <li><strong>Address: </strong> ${customer ? customer.address : ''}</li>
                        <li><strong>Phone: </strong> ${customer ? customer.Person.phoneNumber : ''}</li>
                        <li><strong>Email: </strong> ${customer ? customer.Person.email : ''}</li>
                        <li><strong>Contact: </strong> ${customer ? customer.Person.firstName : ''} ${customer ? customer.Person.lastName : ''}</li>
                    </ul>
                </div>
            </div>
            <div class="invoice-table-wrapper">
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Item / Details</th>
                            <th></th>
                            <th></th>
                            <th>Amount</th>
                            <th>Unit Cost</th>
                            <th>Tax</th>
                            <th>Net Value</th>
                            <th>Gross Value</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(item => `
                        <tr>
                            <td colspan="3">${item.product.name ? item.product.name : ''} ${item.product.description ? item.product.description : ''}</td>
                            <td>${item.amount}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.vat}</td>
                            <td>${item.netValue}</td>
                            <td>${item.grossValue}</td>
                            <td>${item.discount}</td>
                        </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Summary</td>
                            <td></td>
                            <td></td>
                            <td>${summary.totalAmount}</td>
                            <td></td>
                            <td></td>
                            <td>${summary.totalNetValue}</td>
                            <td>${summary.totalGrossValue}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="invoice-payment-details">
                <h3>Payment Details</h3>
                <p><strong>Payment Method: </strong> ${paymentMethod}</p>
                <p><strong>Payment Term: </strong> untill ${validUntil}</p>
                <p><strong>Account Number: </strong> ${bankAccount}</p>
            </div>
        </div>
    </body>
</html>

    `
};

const template2 = (invoiceDetails) => `
  <div style="font-family: Arial, sans-serif;">
    <h1 style="color: blue;">${invoiceDetails.customer.name}</h1>
    <p>Invoice Number: ${invoiceDetails.documentNumber}</p>
  
    <h2 style="color: green;">Billing Details:</h2>
    <p>Company Number: ${invoiceDetails.customer.companyNumber}</p>
    <p>Phone: ${invoiceDetails.customer.Person.phoneNumber}</p>
    <p>Email: ${invoiceDetails.customer.Person.email}</p>
  
    <h2 style="color: green;">Products:</h2>
    ${invoiceDetails.products.map(product => `
      <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
        <h3>Product Name: ${product.product.name}</h3>
        <p>Price: ${product.unitPrice}</p>
        <p>Quantity: ${product.amount}</p>
      </div>
    `).join('')}
  
    <h2 style="color: green;">Total Due:</h2>
    <p>${invoiceDetails.summary.totalGrossValue}</p>
  </div>
`;


const template3 = (invoiceDetails) => `
  <div style="font-family: Arial, sans-serif;">
    <h1 style="color: blue;">${invoiceDetails.documentNumber}</h1>
    <p>Valid From: ${invoiceDetails.validFrom}</p>
    <p>Valid Until: ${invoiceDetails.validUntil}</p>
  
    <h2 style="color: green;">${invoiceDetails.customer.name} Details:</h2>
    <p>Phone: ${invoiceDetails.customer.Person.phoneNumber}</p>
    <p>Email: ${invoiceDetails.customer.Person.email}</p>
  
    <h2 style="color: green;">Products Purchased:</h2>
    ${invoiceDetails.products.map(product => `
      <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
        <h3>Product Name: ${product.product.name}</h3>
        <p>Price: ${product.unitPrice}</p>
        <p>Quantity: ${product.amount}</p>
      </div>
    `).join('')}
  
    <h2 style="color: green;">Invoice Summary:</h2>
    <p>Total Amount: ${invoiceDetails.summary.totalAmount}</p>
    <p>Total Net Value: ${invoiceDetails.summary.totalNetValue}</p>
    <p>Total VAT Value: ${invoiceDetails.summary.totalVatValue}</p>
    <p>Total Gross Value: ${invoiceDetails.summary.totalGrossValue}</p>
  </div>
`;
