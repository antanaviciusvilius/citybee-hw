import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const selectSearches = createFeatureSelector<SearchState>('searches');
export const selectAllSearches = createSelector(
  selectSearches,
  (state: SearchState) => state.searches
);
