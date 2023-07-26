import { Route } from "@angular/router";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { LoginComponent } from "./components/login/login.component";
import AuthComponent from "./components/auth/auth.component";


export const authRoutes:Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
]
