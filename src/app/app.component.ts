import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { Country, Region } from './models/country';
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
  filterControl = new FormControl(null);

  regions = Object.values(Region);

  private _regionSubject$ = new BehaviorSubject<Region | null>(null);
  searchValue$!: Observable<string>;

  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    const countries$ = this._countryService.getAllCountries();

    this.searchValue$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      map((value: string) => value),
      distinctUntilChanged()
    );

    const filter$ = combineLatest([
      countries$,
      this.searchValue$,
      this._regionSubject$,
    ]);

    this.countries$ = filter$.pipe(
      map(([countries, searchValue, region]) =>
        this._searchFn(countries, searchValue, region)
      )
    );
  }

  private _searchFn(
    countries: Country[],
    searchValue: string,
    region: Region | null
  ) {
    const lcSearchValue = searchValue.toLowerCase();
    const lcRegionValue = region && region.toLowerCase();

    return countries.filter(
      (country) =>
        (country.name?.toLowerCase().includes(lcSearchValue) ||
          country.capital?.toLowerCase().includes(lcSearchValue) ||
          country.languages?.toLowerCase().includes(lcSearchValue)) &&
        (lcRegionValue ? country.region?.toLowerCase() === lcRegionValue : true)
    );
  }

  onFilterClick() {
    const region = this.filterControl.value;
    this._regionSubject$.next(region);
  }
}
