/*@author Navdeep
  TAXCALCULATOR
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { Constant } from 'src/assets/Constants';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-calculate-tax',
  templateUrl: './calculate-tax.component.html',
  styleUrls: ['./calculate-tax.component.css']
})
export class CalculateTaxComponent implements OnInit {
  
  taxForm: FormGroup;
  loading = false;
  submitted = false;
  currencies:any = [ 'CAD', 'USD' ,'EUR'];
  EUR_to_USD;EUR_to_CAD;exchangeRate;taxPerc: number;
  taxAmount: number;
  title:any="Tax Calculator"
  grandTotal: any; preTaxAmount:any;currencySelected:any;
  preTaxTotal: any;
  todayDate: Date;
 
 
  constructor(private logger:NGXLogger,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private myservice: MyserviceService) { }

  ngOnInit() {
    this.todayDate = this.myservice.showTodayDate();

    this.taxForm = this.formBuilder.group({
      dateRange: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required]
  });

  }
   // convenience getter for easy access to form fields
   get f() { return this.taxForm.controls; }

   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.taxForm.invalid) {
        return;
    }
    this.loading = true;
     this.getExchangeRates()
   }


  /*
  created on : 21st Mar 2021
  updated On: 21st Oct 2021
  method to get exchange rates from fixer.io
  {params}
  currencies : string : required
  source: string : required
  format: number : required

  i) Set the access_key, source  and format to fixer.io free account api using endpoint /live
  ii) If successful send the response
  iii)Returns JSONObject with values success,terms,policy,timestamp,source and quotes.
 
  Note:fixer.io doesn't provide currency convertion api  usage for free plan however, /live endpoint give us recent conversion rates for USD to any other currency.
  Here the same api is used to get exchange rates for 1 EUR to CAD and USD.
  fixer.io also doesn't provides Https Encryption for free plan so proxy config is used for api usage.
  */
   getExchangeRates(){
    var url =Constant.API_URL + environment.fixIo.access_key   
    const body={
          'currencies':'EUR,CAD',
          'source':'USD',           // free subscription doesn't allow Source Currency Switching to any other source.
          'format':'1'
       }
  
    //setting headers for api
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');

    //making http post request to endpoint
     this.http.post(url,body,{headers}).toPromise().then(
       (response: any) => {
         this.logger.log('Currency exchange rates:',response['quotes']);
    
         this.EUR_to_USD=(1/response['quotes']['USDEUR']);                //  EUR to USD
         this.logger.log('1 EUR to USD:',this.EUR_to_USD);

          this.EUR_to_CAD=(this.EUR_to_USD * response['quotes']['USDCAD'])
         this.logger.log('1 EUR to CAD:',this.EUR_to_CAD);                //  EUR to CAD

         this.calculateTax(this.preTaxAmount,this.currencySelected)
       
       },error=>{
        this.logger.log('Error:',error);
        });
  }
  /*
  created on : 21st Mar 2021
  updated On: 21st Oct 2021
  method to calculate Tax
  {params}
  preTaxAmount : number : required
  currency: string : required
 

  i) accepts preTaxAmount and payment currency
  ii)calculate taxperc and exchange rate according to currency selected
  iii)calcualte pre tax amount ,tax amount and grand total and redirect the user to result page.
 
  */
  calculateTax(preTaxAmount:number,currency:any){
    // selecting exchange and tax rate acc. to currency
    if(currency=='USD')
    {
      this.taxPerc=0.1  // 10%
      this.exchangeRate=this.EUR_to_USD
    }
    else if(currency=='CAD'){
      this.taxPerc=0.11  // 11%
      this.exchangeRate=this.EUR_to_CAD
     
    }
    else{
      this.taxPerc=0.09  // 9%
      this.exchangeRate=1
     
    }
    //calculating tax and grand total
    this.preTaxTotal=this.exchangeRate * preTaxAmount      //pre-tax amount with exchange rate applied
    this.taxAmount= this.taxPerc* this.preTaxTotal         //tax amount to be applied
    this.grandTotal= this.preTaxTotal+ this.taxAmount      //total amount with tax and exchange rate applied

    this.logger.log('Pre Tax Amount Total:', this.preTaxTotal);
    this.logger.log('taxAmount:',this.taxAmount);
    this.logger.log('Grand Total:', this.grandTotal);
  
    //navigating to result screen
    this.router.navigate(['/result'], {queryParams: { preTaxAmount: this.preTaxTotal,
       taxAmount:this.taxAmount,grandTotal:this.grandTotal, exchangeRate: this.exchangeRate,
      currency:this.currencySelected} , skipLocationChange: true});

   }

}
