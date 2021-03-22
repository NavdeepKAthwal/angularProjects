/*@author Navdeep
  TAXCALCULATOR
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-tax-calculated',
  templateUrl: './tax-calculated.component.html',
  styleUrls: ['./tax-calculated.component.css']
})
export class TaxCalculatedComponent implements OnInit {
  preTaxAmount: any;
  taxAmount: any;
  grandTotal: any;
  exchangeRate: any;
  currencySelected: any;

  constructor(private router: Router,
    private activeRoute:ActivatedRoute ) { 
   
  }

  ngOnInit() {
    
    //Quering the activated route to get data to be displayed
    this.activeRoute.queryParams.subscribe(params =>{  
    this.preTaxAmount=params['preTaxAmount'];
    this.taxAmount=params['taxAmount'];
    this.grandTotal=params['grandTotal'];
    this.exchangeRate=params['exchangeRate'];
    this.currencySelected=params['currency'];
    
  });
  }

}
