import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Pipe({
  name: 'location',
  pure: false
})
export class LocationPipe implements PipeTransform {

  constructor(private api: ApiService) { }

  currentAddress;

  transform(value: string, ...args: any[]): any {
    const letlang = value.split(' ');
    
    this.api.getAddress(letlang[0], letlang[1])
      .subscribe(
        (address: string) => this.currentAddress = new DOMParser().parseFromString(address, 'text/xml').getElementsByTagName('result')[0].childNodes[0].nodeValue
      );

    return this.currentAddress;
  }

}
