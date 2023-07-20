import React from "react";

export const generateHTML = (invoiceDetails) => {
    return template1(invoiceDetails);
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
                margin-bottom: .5em;
            }
            
            .invoice-header-left {
            
            }
            
            .invoice-title {
                margin-bottom: .2em;
                font-size: 1.5em;
                
            }
            
            .invoice-date {
                margin: 0;
                font-size: 1em;
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
                display: flex;
                flex-direction: column;
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
            
            .fieldLabel {
                color: rgba(27, 27, 27, 0.5);
                margin-right: 1em;
            }
            
            /*.fieldLine {*/
            /*    display: flex;*/
            /*    flex-direction: row;*/
            /*    justify-content: space-between;*/
            /*    */
            /*}*/
            
            .fieldLine {
                display: grid;
                grid-template-columns: 1fr 2fr;
                /*justify-content: space-between;*/
                
            }
            .fieldText {
                /*align-items: left;*/
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
                    <h3 class="invoice-title">Company Details</h3>
                    <ul class="invoice-info-details">
                        <li class="fieldLine">
                            <span class="fieldLabel">Name: </span>
                            <span class="fieldText">${companyDetails.firmName} </span>
                        </li>
                        <li class="fieldLine"><span class="fieldLabel">Address: </span> <span class="fieldText">${companyDetails.address} </span></li>
                        <li class="fieldLine"><span class="fieldLabel">Phone: </span> <span class="fieldText">${employee.phoneNumber} </span></li>
                        <li class="fieldLine"><span class="fieldLabel">Email: </span> <span class="fieldText">${employee.email} </span></li>
                        <li class="fieldLine"><span class="fieldLabel">Contact: </span> <span class="fieldText">${employee.firstName} ${employee.lastName} </span></li>
                    </ul>
                </div>
                <div class="invoice-info-customer">
                    <h3 class="invoice-title">Customer Details</h3>
                    <ul class="invoice-info-details">
                        <li class="fieldLine">
                            <span class="fieldLabel">Name: </span>
                            <span>${customer ? customer.name : ''}</span>
                        </li>
                        <li class="fieldLine">
                            <span class="fieldLabel">Address: </span>
                            <span>${customer ? customer.address : '' }</span>
                        </li>
                        <li class="fieldLine">
                            <span class="fieldLabel">Phone: </span>
                            <span>${customer ? customer.Person.phoneNumber : ''}</span>
                        </li>
                        <li class="fieldLine">
                            <span class="fieldLabel">Email: </span>
                            <span>${customer ? customer.Person.email : ''}</span>
                        </li>
                        <li class="fieldLine">
                            <span class="fieldLabel">Contact: </span>
                            <span>${customer ? customer.Person.firstName : ''} ${customer ? customer.Person.lastName : ''}</span>
                        </li>
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
