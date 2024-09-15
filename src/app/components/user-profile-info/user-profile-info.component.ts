import {ChangeDetectionStrategy, Component, input} from '@angular/core';


@Component({
  selector: 'pl-user-profile-info',
  standalone: true,
  templateUrl: './user-profile-info.component.html',
  styleUrl: './user-profile-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileInfoComponent {
  name = input<string>();
  handle = input<string>();
  bio = input<string>();
  location = input<string>();
  website = input<string>();
}
