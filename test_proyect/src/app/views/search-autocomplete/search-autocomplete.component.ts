import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit {
  filterForm!: FormGroup;
  filteredOptions!: Observable<User[]>;
  
  options: User[] = USERS;
  dataFilter: Record<string, any>[] = DATA_FILTER;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.buildForm();
    this.initAutocompleteFilter();
  }

  private buildForm() {
    this.filterForm = this.formBuilder.group({
      type: [''],
      value: [''],
    })
  }

  private initAutocompleteFilter() {
    const control = this.filterForm.controls['value'];
    this.filteredOptions = control.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = (typeof value === 'string') ? (value) : (value?.name);
        console.log('name', name)
        return name ? this._filter(name.toString()) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    if (!user) return '';
    const name = user.name ? user.name : '';
    const lastName = user.lastName ? user.lastName : '';
    const fullName = `${name} ${lastName}`;
    return user  ? fullName : '';
  }

  private _filter(filter: string|number): User[] {
    let control: keyof User = this.filterForm.controls['type'].value;
    if (!control) control = 'name';
    const filterValue = filter.toString().toLowerCase();

    return this.options.filter(option => option[control].toString().toLowerCase().includes(filterValue));
  }

  typeSelectionChange(e: MatSelectChange) {
    this.filterForm.controls['value'].reset();
  }

  getOptionsDisplayData(user: User): string {
    const control: keyof User = this.filterForm.controls['type'].value;
    if (!control) return this.displayFn(user);
    return user[control].toString();
  }
}

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

const DATA_FILTER = [
  {key: 'id', value: 'ID'},
  {key: 'name', value: 'Nombre'},
  {key: 'lastName', value: 'Apellido'},
  {key: 'email', value: 'Correo'},
]

const USERS: User[] = [
  {
    id: 1,
    name: 'Alex',
    lastName: 'Kriss',
    email: 'ak123@as.asd'
  },
  {
    id: 2,
    name: 'Brenda',
    lastName: 'Loayza',
    email: 'bl456@as.asd'
  },
  {
    id: 3,
    name: 'Cyrus',
    lastName: 'Max',
    email: 'cm789@as.asd'
  },
  {
    id: 4,
    name: 'Dante',
    lastName: 'Neru',
    email: 'dn987@as.asd'
  },
  {
    id: 5,
    name: 'Erik',
    lastName: 'Oro',
    email: 'eo654@as.asd'
  },
  {
    id: 6,
    name: 'Frank',
    lastName: 'Paz',
    email: 'fp321@as.asd'
  },
  {
    id: 7,
    name: 'Gray',
    lastName: 'Rex',
    email: 'gr159@as.asd'
  },
  {
    id: 8,
    name: 'Haru',
    lastName: 'Silph',
    email: 'hs357@as.asd'
  },
  {
    id: 9,
    name: 'Irene',
    lastName: 'Ten',
    email: 'it951@as.asd'
  },
  {
    id: 10,
    name: 'Jazmin',
    lastName: 'Uri',
    email: 'ju753@as.asd'
  },
]