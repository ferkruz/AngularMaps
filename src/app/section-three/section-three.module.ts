import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionThreeComponent } from './section-three/section-three.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [SectionThreeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SectionThreeComponent }]),
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    AgmDirectionModule,   
    AgmCoreModule.forRoot({
      libraries: ['places', 'drawing', 'geometry',]
    })
  ],
})
export class SectionThreeModule {}
