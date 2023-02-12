import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTwoComponent } from './section-two/section-two.component';
import { RouterModule } from '@angular/router';
//import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [SectionTwoComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: SectionTwoComponent }]),
    //MatListModule,
    AgmCoreModule.forRoot({
      libraries: ['drawing', 'geometry',]
    })
  ],
})
export class SectionTwoModule {}