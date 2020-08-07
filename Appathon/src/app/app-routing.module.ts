import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ToolComponent } from './tool/tool.component'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"tool", component: ToolComponent},
  {path:"about", component: AboutComponent},
  {path: '**', redirectTo: "/home", pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
