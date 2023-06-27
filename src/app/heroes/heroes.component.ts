import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  getHeroes(): void {
    //Old way, sync call
    //The assignment executes synchronously, it can block the UI if we have to wait for an external service call
    //this.heroes = this.heroService.getHeroes();

    //async call => subscribe for it (callback)
    //result is the emitted array from the service
    this.heroService.getHeroes()
      .subscribe(result => this.heroes = result);

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({ name } as Hero)
      .subscribe(result => this.heroes.push(result));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
