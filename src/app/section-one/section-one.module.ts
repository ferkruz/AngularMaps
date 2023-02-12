import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionOneComponent } from './section-one/section-one.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [SectionOneComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SectionOneComponent }]),
    MatCardModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBO-DPJZhfQIiEZLk6pCpxgpsp67r4aCo4',
      language: "es",
      libraries: ['places', 'drawing', 'geometry',]
    })
  ],
})
export class SectionOneModule {}
