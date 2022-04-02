import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { allCountries } from './mocks/allCountries';
import { Country, Region } from './models/country';
import { searchReducer } from './state/search/search.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        StoreModule.forRoot({ searches: searchReducer }),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have countries filled`, (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    app.countries$!.subscribe((countries) => {
      expect(countries.length).toBeGreaterThan(0);
      done();
    });
  });

  it(`should return countries list with Lithuania in it`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const searchTerm = 'lith';
    const region = null;

    const lithuania: Country = {
      flag: 'https://flagcdn.com/lt.svg',
      name: 'Republic of Lithuania',
      capital: 'Vilnius',
      region: Region.Europe,
      languages: 'Lithuanian',
    };
    // @ts-ignore
    const lithuaniaInCountryList = app._searchFn(
      allCountries,
      searchTerm,
      region
    );
    expect(lithuaniaInCountryList).toContain(lithuania);
  });

  it(`should return countries list sorted by region`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const sortName = 'region';

    const countries = [
      {
        flag: 'https://flagcdn.com/no.svg',
        name: 'Kingdom of Norway',
        capital: 'Oslo',
        region: Region.Europe,
        languages: 'Norwegian Nynorsk,Norwegian Bokmål,Sami',
      },
      {
        flag: 'https://flagcdn.com/bs.svg',
        name: 'Commonwealth of the Bahamas',
        capital: 'Nassau',
        region: Region.Americas,
        languages: 'English',
      },
      {
        flag: 'https://flagcdn.com/lt.svg',
        name: 'Republic of Lithuania',
        capital: 'Vilnius',
        region: Region.Europe,
        languages: 'Lithuanian',
      },
      {
        flag: 'https://flagcdn.com/ke.svg',
        name: 'Republic of Kenya',
        capital: 'Nairobi',
        region: Region.Africa,
        languages: 'English,Swahili',
      },
    ];

    const expectedCountries = [
      {
        flag: 'https://flagcdn.com/ke.svg',
        name: 'Republic of Kenya',
        capital: 'Nairobi',
        region: Region.Africa,
        languages: 'English,Swahili',
      },
      {
        flag: 'https://flagcdn.com/bs.svg',
        name: 'Commonwealth of the Bahamas',
        capital: 'Nassau',
        region: Region.Americas,
        languages: 'English',
      },
      {
        flag: 'https://flagcdn.com/no.svg',
        name: 'Kingdom of Norway',
        capital: 'Oslo',
        region: Region.Europe,
        languages: 'Norwegian Nynorsk,Norwegian Bokmål,Sami',
      },
      {
        flag: 'https://flagcdn.com/lt.svg',
        name: 'Republic of Lithuania',
        capital: 'Vilnius',
        region: Region.Europe,
        languages: 'Lithuanian',
      },
    ];
    // @ts-ignore
    const sortedList = app._sortFn(countries, sortName);
    expect(sortedList).toEqual(expectedCountries);
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain(
  //     'citybee-hw app is running!'
  //   );
  // });
});
