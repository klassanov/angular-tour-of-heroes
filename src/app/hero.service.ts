import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // Old way
  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  //Make async calls possible by returning an Observable from the rxjs library
  //Cast the array to observable type by using the function of
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("Hero Service: fetched heroes");
    return heroes;
  }
}
