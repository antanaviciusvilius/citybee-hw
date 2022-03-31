import { createAction, props } from '@ngrx/store';
import { Region } from 'src/app/models/country';

export const addSearch = createAction(
  '[Search Page] Add Search',
  props<{ searchTerm: string; region: Region | null }>()
);
