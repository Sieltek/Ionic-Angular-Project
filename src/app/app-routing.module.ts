import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'connexion', loadChildren: './connexion/connexion.module#ConnexionPageModule' },
  { path: 'enregistrer', loadChildren: './enregistrer/enregistrer.module#EnregistrerPageModule' },
  { path: 'change-pseudo', loadChildren: './change-pseudo/change-pseudo.module#ChangePseudoPageModule' },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
