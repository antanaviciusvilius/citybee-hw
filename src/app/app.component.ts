import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { Country, Region } from './models/country';
import { CountryService } from './services/country.service';
import { addSearch } from './state/search/search.actions';
import { Search, SearchWithoutDate } from './state/search/search.model';
import { selectAllSearches } from './state/search/search.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  countries$!: Observable<Country[]>;

  searchControl = new FormControl(null);
  regionControl = new FormControl(null);
  latestSearchControl = new FormControl(null);

  regions = Object.values(Region);

  private _filterSubject = new BehaviorSubject<SearchWithoutDate>({
    searchTerm: '',
    region: null,
  });
  filterSubject$ = this._filterSubject.asObservable();

  searches$ = this._store.select(selectAllSearches);

  sortType$ = new BehaviorSubject<keyof Country | null>(null);

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onFilterClick();
    }
  }

  constructor(private _countryService: CountryService, private _store: Store) {}

  ngOnInit(): void {
    const countries$ = this._countryService.getAllCountries();

    // if we would like to use search function without pressing filter button
    // const searchValue$ = this.searchControl.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(100),
    //   map((value: string) => value),
    //   distinctUntilChanged()
    // );

    const filter$ = combineLatest([countries$, this.filterSubject$]).pipe(
      tap(([_, filterValues]) =>
        this.addSearch(filterValues.searchTerm, filterValues.region)
      ),
      map(([countries, filterValues]) =>
        this._searchFn(countries, filterValues.searchTerm, filterValues.region)
      )
    );

    const sortWithFilter$ = combineLatest([filter$, this.sortType$]);

    this.countries$ = sortWithFilter$.pipe(
      map(([countries, sort]) =>
        sort ? this._sortFn([...countries], sort) : [...countries]
      )
    );

    this.latestSearchControl.valueChanges.subscribe((value) =>
      this.setFromLatestSearches(value)
    );
  }

  //#region Filter
  private _searchFn(
    countries: Country[],
    searchValue: string,
    region: Region | null
  ): Country[] {
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
    const searchTerm = this.searchControl.value;
    const region = this.regionControl.value;
    this._filterSubject.next({ searchTerm, region });
  }

  addSearch(searchTerm: string, region: Region | null) {
    if (!searchTerm && !region) {
      return;
    }

    this._store.dispatch(addSearch({ searchTerm, region }));
  }

  setFromLatestSearches(latestSearch: Search) {
    this.searchControl.setValue(latestSearch?.searchTerm || '');
    this.regionControl.setValue(latestSearch?.region || null);
    this.onFilterClick();
  }
  //#endregion ---

  //#region Sort
  private _sortFn(countries: Country[], sortName: keyof Country): Country[] {
    const countriestest = countries.sort((a, b) => {
      return a[sortName]?.localeCompare(b[sortName]!)!;
    });
    return countriestest;
  }

  onColumnClick(column: keyof Country | null) {
    this.sortType$.next(column);
  }
  //#endregion ---
}
