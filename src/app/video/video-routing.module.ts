import { NgModule } from '@angular/core';
import { ManageComponent } from './manage/manage.component';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ClipComponent } from '../clip/clip.component';

const routes: Routes = [
  { path: 'manage', component: ManageComponent, data: { authOnly: true } },
  { path: 'upload', component: UploadComponent, data: { authOnly: true } },
  { path: 'clip/:id', component: ClipComponent, data: { authOnly: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
