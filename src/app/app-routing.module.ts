import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inprocess',
  },
  {
    path: 'inprocess',
    loadChildren: () =>
      import('./section-one/section-one.module').then(
        (m) => m.SectionOneModule
      ),
  },
  {
    path: 'inreview',
    loadChildren: () =>
      import('./section-two/section-two.module').then(
        (m) => m.SectionTwoModule
      ),
  },
  {
    path: 'rejected',
    loadChildren: () =>
      import('./section-three/section-three.module').then(
        (m) => m.SectionThreeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
