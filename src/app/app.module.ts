import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { searchReducer } from './state/search/search.reducer';

@NgModule({
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ searches: searchReducer }),
  ],
  declarations: [AppComponent, HighlightPipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
