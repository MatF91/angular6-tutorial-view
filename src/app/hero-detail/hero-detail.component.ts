import { Component, OnInit, Input } from '@angular/core';
import { HeroDTO } from '../DTO/HeroDTO';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: HeroDTO;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
    ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0)
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
