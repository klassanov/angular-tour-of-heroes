import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = "api/heroes";
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }

  // Old way
  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  //Make async calls possible by returning an Observable from the rxjs library
  //Cast the array to observable type by using the function of
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // this.log("Hero Service: fetched heroes");
    // return heroes;

    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("Hero Service: fetched heroes")),
      catchError(this.handleError<Hero[]>('getHeroes', [])
      ));
  }

  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id == id)!;
    // this.log(`Hero Service: fetched hero id = ${id}`);
    // return of(hero);
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`Hero Service: fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)
      ));
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')
      ));
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero')
      ));
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
     return this.httpClient.delete<Hero>(url,this.httpOptions).pipe(
       tap(_ => this.log(`deleted hero id=${id}`)),
       catchError(this.handleError<Hero>('deleteHero')
    ));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  } 

  private log(message: string): void {
    this.messageService.add(`Hero Service ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
