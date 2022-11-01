import { NgModule } from '@angular/core';
import { ManageComponent } from './manage/manage.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'manage', component: ManageComponent, data: { authOnly: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
