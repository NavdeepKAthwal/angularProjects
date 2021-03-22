import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CalculateTaxComponent } from './calculate-tax.component';
import { AppRoutingModule } from '../app-routing.module';
import { TaxCalculatedComponent } from '../tax-calculated/tax-calculated.component';
import { MyserviceService } from '../myservice.service';

describe('CalculateTaxComponent', () => {
  let component: CalculateTaxComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<CalculateTaxComponent>;
  let service: MyserviceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        CalculateTaxComponent,
        TaxCalculatedComponent
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
    fixture = TestBed.createComponent(CalculateTaxComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement; 
    service = TestBed.get(MyserviceService); // * inject service instance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', () => {
    component.onSubmit()
    expect(component).toBeTruthy();
  });

  it('should match the title', () => {
    // * arrange
    const title = 'Tax Calculator';
    const titleElement = element.querySelector('.mat-card-title');
    // * act
    component.title = title;
    fixture.detectChanges(); 
    // * assert
    expect(titleElement.textContent).toContain(title);
  });

  it('should give today date', () => {
    // * act
    service.showTodayDate();
    // * assert
    expect(service.showTodayDate()).toEqual(new Date());
  });

  


});
