import { Injectable } from '@angular/core';
import { StorageItem } from '../models/storage-item';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  localStorageSupported: boolean;
  constructor() {
    this.localStorageSupported = typeof window.localStorage !== 'undefined' && window.localStorage != null;
   }
   add(item: StorageItem): boolean {
    if ( this.localStorageSupported && item ) {
      localStorage.setItem(item.key, item.value);
      return true;
    }
    console.error('Local storage is not suported');
    return false;
  }

  get(key: string): string {
    if ( this.localStorageSupported ) {
      return localStorage.getItem(key);
    }
    return null;
  }

  remove(key: string) {
      if (this.localStorageSupported) {
          localStorage.removeItem(key);
      }
  }
}
