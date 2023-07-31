import { Route } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

export const dashboardRoutes:Route[] = [
  {
    path: '',
    component: DashboardComponent
  }
];
