import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children:[ //Carrega rotas filhas dentro de admin, onde o componente principal sempre renderizará os menus e s os demais componentes
        {path: "carros", component: CarroslistComponent},
        {path: "carros/new", component: CarrosdetailsComponent},
        {path: "carros/edit", component: CarrosdetailsComponent},
    ]},

];
