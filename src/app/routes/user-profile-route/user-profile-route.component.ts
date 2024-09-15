import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {UserProfileCardComponent, UserProfileVM} from "../../components/user-profile-card/user-profile-card.component";
import {UserProfile} from "../../models/data";


@Component({
  selector: 'user-profile-route',
  standalone: true,
  imports: [
    UserProfileCardComponent
  ],
  templateUrl: './user-profile-route.component.html',
  styleUrl: './user-profile-route.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileRouteComponent {

  userData = input.required<UserProfile | null>();
  user = computed<UserProfileVM | null>(() => {

    const userData = this.userData();

    if(!userData) {
      return null;
    }

    return {
      ...userData,
      handle: userData.socialMediaHandle,
      image: userData.profileImgSrc
    }
  });
}
