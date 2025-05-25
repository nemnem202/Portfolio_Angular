import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ChatRouteComponent } from '../chat-route/chat-route.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'chat', component: ChatRouteComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' },
];
