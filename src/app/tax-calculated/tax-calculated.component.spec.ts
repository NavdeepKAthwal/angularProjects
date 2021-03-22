import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TaxCalculatedComponent } from './tax-calculated.component';
import { AppRoutingModule } from '../app-routing.module';
import { CalculateTaxComponent } from '../calculate-tax/calculate-tax.component';

describe('TaxCalculatedComponent', () => {
  let component: TaxCalculatedComponent;
  let fixture: ComponentFixture<TaxCalculatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    TaxCalculatedComponent,
    CalculateTaxComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    // level can be set according to requirements
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.LOG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
 
  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
