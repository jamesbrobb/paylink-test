import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {UserProfileInfoComponent} from "../user-profile-info/user-profile-info.component";
import {UserProfileImageComponent} from "../user-profile-image/user-profile-image.component";


export type UserProfileVM = {
  name: string
  handle: string
  image: string
  bio: string
  location: string
  website: string
}

@Component({
  selector: 'pl-user-profile-card',
  standalone: true,
  imports: [
    UserProfileInfoComponent,
    UserProfileImageComponent
  ],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileCardComponent {
  data = input.required<UserProfileVM>();
}
