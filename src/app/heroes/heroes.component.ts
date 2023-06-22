import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  selectedHero?: Hero;
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
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

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
