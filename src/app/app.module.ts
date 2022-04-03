import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { searchReducer } from './state/search/search.reducer';

@NgModule({
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ searches: searchReducer }),
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
  ],
  declarations: [AppComponent, HighlightPipe, CountriesTableComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
