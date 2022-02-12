import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [{
  path:"",
  component:MainPageComponent
}, {
  path:"login",
  component:LoginComponent
}, {
  path:"register",
  component:RegisterComponent
}, {
  path:"test",
  component:TestComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
