import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(array: any, searchText?: any, searchBy?:string): any {
    console.log(searchBy);
    if (array.length === 0) {
      return null;
    }
    if (!searchText) {
      return array;
    }
    return array.filter(contactDetails => 
      //console.log(contactDetails[searchBy])
      (contactDetails[searchBy].toLowerCase().includes(searchText.toLowerCase())) || (contactDetails[searchBy].replace('-','').includes(searchText)));
     //(contactDetails['Display Name'].toLowerCase().includes(searchText.toLowerCase())) || (contactDetails['Home Phone'].replace('-','').includes(searchText)));
  }
}
