import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IdentityFormComponent } from './identity-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        CommonModule  
    ],
    declarations: [ IdentityFormComponent ],
    exports:[ IdentityFormComponent ],
    providers: []
})
export class IdentityFormModule { }
