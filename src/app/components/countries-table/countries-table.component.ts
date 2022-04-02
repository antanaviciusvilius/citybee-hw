import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { SearchWithoutDate } from 'src/app/state/search/search.model';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesTableComponent implements OnInit {
  @Input() countries$!: Observable<Country[]>;
  @Input() filterSubject$!: Observable<SearchWithoutDate>;

  @Output() onColumnClick: EventEmitter<keyof Country | null> =
    new EventEmitter();

  activeSort: keyof Country | null = null;

  constructor() {}

  ngOnInit(): void {}

  selectSortHeader(column: keyof Country) {
    if (this.activeSort === column) {
      this.activeSort = null;
      this.onColumnClick.emit(this.activeSort);
      return;
    }
    this.activeSort = column;
    this.onColumnClick.emit(this.activeSort);
  }
}
