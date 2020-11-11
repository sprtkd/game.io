import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SystemComponent } from './system/system.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'system', component: SystemComponent, pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
