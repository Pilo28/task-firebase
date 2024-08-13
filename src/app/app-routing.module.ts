import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard',
    canActivate: [authGuard], 
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)},
  {path: 'auth', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
