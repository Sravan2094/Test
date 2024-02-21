import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface ACCOUNT {
  id: number,
  type: string,
  balance: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Angular_Proj';
  accounts :ACCOUNT[] = [];

  account = {
    balance:0,
    type: ''
  }

  constructor(public httpClient : HttpClient){
     this.getData();
  }

  getData(){
    this.httpClient.get("http://localhost:3000/accounts").subscribe((data : any) => {
      this.accounts = data;
    });
  }

  addAccount(){
    this.httpClient.post("http://localhost:3000/accounts",this.account).subscribe((data : any) => {
      // this.getData(); 
      // removed this above line as it is calling the server again instead added below line of code to optimise it
      this.accounts.push(data); 
    });
  }

  sortAsc(){
    this.accounts.sort((a,b) => {
      return a.balance - b.balance;
    });
  }

}
