import { createReducer, on } from '@ngrx/store';
import { addSearch } from './search.actions';
import { Search } from './search.model';

export interface SearchState {
  searches: Search[];
}

export const initialState: SearchState = {
  searches: [],
};

export const searchReducer = createReducer(
  initialState,
  on(addSearch, (state, { searchTerm, region }) => ({
    ...state,
    searches: state.searches.filter(
      (search) => search.searchTerm === searchTerm && search.region === region
    ).length
      ? [...state.searches]
      : [
          ...state.searches,
          {
            date: new Date(),
            searchTerm,
            region,
          },
        ],
  }))
);
