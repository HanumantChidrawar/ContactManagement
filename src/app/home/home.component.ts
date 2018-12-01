import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { MatChipSelectionChange } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public contacts:any[]=[];
  public selectedContact:any;
  public selectedId:number;
  public allCountries:any;
  public countries:any[]=[];
  public countryCodes: string[];
  public selectedField: string;
  public filterName:any ={ "Display Name": ''};
  public filterName1:any ={ "Home Phone": ''};
  public filterText:any;
  public searchBy:boolean;
  public phone:boolean;
  public searchChips:string[];
  public selectedChip:string = "Display Name";


  constructor( 
    public appService: AppService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getContacts();   //to get all the contacts from the provided Json file 
    this.getCountries(); // to get all the countries from Json file.
    this.getCountryCodes();// to get country codes from the JSon file thought get method using app sevice.
  }

  public getContacts = ()=>{

    this.appService.getContacts()
      .subscribe((data) => {
        this.contacts = data;
        this.searchChips = Object.keys(this.contacts[0]);
        console.log(this.searchChips);

      })//end subscribe
      
  }//end getContacts

  public displayDetails= (id:number)=>{//method will set the selectedId and then will display the details of selected contact.

    this.selectedId = id;
    this.selectedContact = this.contacts[id];
    

  }//end displayDetails

  public updateContact= ()=>{//this will update the contact details once save button is clicked and will show toastr message on success.

    this.contacts[this.selectedId] = this.selectedContact;
    this.toastr.success(`Contact ${this.selectedContact["Display Name"]} has been Updated`);

  }//end updateContact

  public getCountries(){//will get all the countries from JSOn process them  and sort them according to ascending order.
    this.appService.getCountryNames()
      .subscribe((data) => {
        this.allCountries = data;
        for( let i in data){

          let singleCountry = {
             name:data[i],
             code : i
          }
          this.countries.push(singleCountry);
        }
    
        this.countries = this.countries.sort((first, second)=>{
          return first.name.toUpperCase() < second.name.toUpperCase() ? -1 :( first.name.toUpperCase() > second.name.toUpperCase()? 1 :0 ) ; 
        });//end sort
      })//end subscribe
      
  }//end getCountries

  public getCountryCodes(){//this will get all the country codes.
    this.appService.getCountryNumbers()
      .subscribe((data) => {
        this.countryCodes = data;
      })//end subscribe
  }//end getCountries

  public onChangeOfCountry(){//will change the country code in contact details on change of Home country.

    this.selectedContact["Country Code"] = this.countryCodes[this.selectedContact["Home Country"]];
    
  }//end onChangeOfCountry

  public chipChanged(event:MatChipSelectionChange){
    console.log(event.selected);
    console.log(event.source);
  }//end change function

  public selectChip(chip:string){
    console.log(chip);
    this.selectedChip = chip;
  }//end selectChip

}
