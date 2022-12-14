import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path:'',
    component:BaseComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./../../views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
