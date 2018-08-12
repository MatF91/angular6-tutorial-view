import { Component, OnInit } from '@angular/core';
import { HeroDTO } from '../DTO/HeroDTO';
import { DatePipe } from '@angular/common';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroDTO[];
  datePipe = new DatePipe("en-US"); //by default only en-US is available
  // selectedHero: HeroDTO;

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  // onSelect(hero: HeroDTO) {
  //   this.messageService.add("[HeroesComponent] Clicked: " + hero.name + " with id " + hero.id + " and birthday date " + this.datePipe.transform(hero.birthday));
  //   this.selectedHero = hero;
  // }

  // getHeroes(): void {
  //   console.log("Obtaining heroes from service... Synchronously.");
  //   this.heroes = this.heroService.getHeroes();
  // }

  /**
   * Obtaining heroes from service asynchronously
   */
  getHeroes(): void {
    if (this.heroes == undefined) {
      console.log("Obtaining heroes from service... Asynchronously. // TODO: how cache this?");
      this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    }
    else {
      console.log("Heroes already obtained from service.");
    }
  }
}
