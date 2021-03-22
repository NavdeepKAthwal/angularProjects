import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculateTaxComponent } from './calculate-tax/calculate-tax.component';
import { TaxCalculatedComponent } from './tax-calculated/tax-calculated.component';


const routes: Routes = [
  { path: '', redirectTo: '/calculate', pathMatch: 'full' },
  { path: 'calculate', component: CalculateTaxComponent },
  { path: 'result', component: TaxCalculatedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
