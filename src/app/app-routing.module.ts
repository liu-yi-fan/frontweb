import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PTypeCardComponent } from './p-type-card/p-type-card.component';

const routes: Routes = [
  {
    path: 'packages',
    component: PTypeCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
