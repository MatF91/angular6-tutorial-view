import { Injectable } from '@angular/core';
import { HeroDTO } from '../DTO/HeroDTO';
import { HEROES } from '../mocks/hero-mock';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private httpServerPort = 8090;
  private heroesListUrl = "http://localhost:8090/api/heroes";

  constructor(private messageService: MessageService, private http: HttpClient) { }

  // getHeroes(): Observable<HeroDTO[]> {
  //   this.messageService.add("[HeroService] Fetched mocked heroes");
  //   return of(HEROES);
  // }

  // getHeroes(): Observable<HeroDTO[]> {
  //   this.messageService.add("[HeroService] Fetched heroes from HTTP server");
  //   return this.http.get<HeroDTO[]>(this.heroesListUrl).pipe(
  //     catchError(this.handleError('getHeroes', []))
  //   );
  // }

  /**
   * ***tap*** operator looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves.
   * Source: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
   */
  getHeroes(): Observable<HeroDTO[]> {
    
    return this.http.get<HeroDTO[]>(this.heroesListUrl).pipe(tap(heroes => this.messageService.add("[HeroService] Fetched heroes from HTTP server")),
      catchError(this.handleError('getHeroes', []))
    );
  }

  // getHero(id: number): Observable<HeroDTO> {
  //   this.messageService.add("Obtaining hero with id: " + id);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  getHero(id: number): Observable<HeroDTO> {
    return this.http.get<HeroDTO>(this.heroesListUrl + "?id=" + id)
      .pipe(tap(_ => this.messageService.add("Obtaining hero with id: " + id)),
      catchError(this.handleError<HeroDTO>("getHero id=" + id, null)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.add('ERR: ' + operation + ' failed: '  + error.message);
      return of(result as T);
    };
  }
}
