import {Observable, of} from "rxjs";
import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';
import {inject} from "@angular/core";
import {UserProfileRouteComponent} from "./routes/user-profile-route/user-profile-route.component";
import {NotFoundRouteComponent} from "./routes/not-found-route/not-found-route.component";
import {UserProfileService} from "./services/user-profile.service";
import {UserProfile} from "./models/data";


export const routes: Routes = [{
  path: '',
  redirectTo: '/users',
  pathMatch: 'full'
}, {
  path: 'users',
  component: UserProfileRouteComponent,
  resolve: {
    userData: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile | null> => {
      const service = inject(UserProfileService),
        userId = route.params['userId'];

      if(!userId) {
        return of(null);
      }
      return service.getUserById(userId);
    }
  }
}, {
  path: '**',
  component: NotFoundRouteComponent
}];
