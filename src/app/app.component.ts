import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './models/country';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'citybee-hw';

  countries$!: Observable<Country[]>;

  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    this.countries$ = this._countryService.getAllCountries();
  }
}
