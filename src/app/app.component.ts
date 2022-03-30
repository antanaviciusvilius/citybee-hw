import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
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

  searchControl = new FormControl(null);

  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    const countries$ = this._countryService.getAllCountries();

    const searchValue$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      map((value: string) => value),
      distinctUntilChanged()
    );

    const filter$ = combineLatest([countries$, searchValue$]);

    this.countries$ = filter$.pipe(
      map(([countries, searchValue]) =>
        this._filterFunction(countries, searchValue)
      ),
      tap((res) => console.log(res))
    );
  }

  private _filterFunction(countries: Country[], searchValue: string) {
    const lowerCase = searchValue.toLowerCase();
    return countries.filter(
      (country) =>
        country.name?.toLowerCase().includes(lowerCase) ||
        country.capital?.toLowerCase().includes(lowerCase) ||
        country.languages?.toLowerCase().includes(lowerCase)
    );
  }
}
