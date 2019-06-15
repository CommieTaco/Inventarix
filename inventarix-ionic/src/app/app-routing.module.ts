import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'articles', loadChildren: './articles/articles.module#ArticlesPageModule' },
  { path: 'article/:id', loadChildren: './article/article.module#ArticlePageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
<<<<<<< HEAD
  { path: 'slider', loadChildren: './slider/slider.module#SliderPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
=======
  { path: 'slider', loadChildren: './slider/slider.module#SliderPageModule' }
>>>>>>> be2d41b8544da6935059653466e77cfb6b16fd2f


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
