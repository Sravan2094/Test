import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import * as data from '../../mock/mockData.json';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  let httpMockSpy : any;
  const url = "http://localhost:3000/accounts";
  const accountsResponse = data.accounts;
  const addAccountResponse =  {
    "id": "12345678901",
    "type": "SAVING",
    "balance": 2000.15
  };
  beforeEach(async () => {
    httpMockSpy = {
      get: jest.fn().mockReturnValue(of(accountsResponse)),
      post: jest.fn().mockReturnValue(of(addAccountResponse))
    };
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpMockSpy }
      ],
      imports : [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(async () => {
     fixture = TestBed.createComponent(AppComponent);
     component = fixture.componentInstance;
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test('should call the method getData', (done) => {
    component.getData();
    httpMockSpy.get(url).subscribe({
      next :(data : any) => {
        component.accounts = data;
        expect(data).toEqual(accountsResponse);
        done();
      },error:{
      }
    });
    expect( httpMockSpy.get ).toHaveBeenCalledWith(url);
  });

  test('should call the method addAccount', (done) => {
    component.addAccount();
    httpMockSpy.post(url,addAccountResponse).subscribe({
      next :(data : any) => {
        expect(data).toEqual(addAccountResponse);
        done();
      },error:{
      }
    });
    expect( httpMockSpy.post ).toHaveBeenCalledWith(url,addAccountResponse);
    expect( component.accounts.length).toEqual(12);
  });

  test('should call the method sortAsc', () => {
    component.accounts.sort = jest.fn();
    component.sortAsc();
    expect(component.sortAsc).toHaveBeenCalled();
  });
  
});
