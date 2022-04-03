import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _apiUrl = 'https://restcountries.com/v3.1';

  constructor(private _http: HttpClient) {}

  getAllCountries() {
    return this._http
      .get(`${this._apiUrl}/all?fields=flags,name,capital,region,languages`)
      .pipe(
        map(
          (res: any) =>
            res.map((data: any) => {
              return {
                flag: data.flags.svg,
                name: data.name.official,
                capital: data.capital[0],
                region: data.region,
                languages: Object.values(data.languages).join(', '),
              };
            }) as Country[]
        )
      );
  }
}
