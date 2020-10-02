import { Injectable } from '@angular/core';
import {Track} from '../models/track';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  searchFilterSubject = new Subject<string>();
  private searchFilter = '';

  constructor() { }

  setFilter(name: string): void{
    this.searchFilter = name;
    this.searchFilterSubject.next(name);
  }

  // clearInput(): void{
  //   this.searchFilterSubject.next('');
  // }
}
