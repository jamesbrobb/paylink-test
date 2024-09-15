import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'pl-user-profile-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './user-profile-image.component.html',
  styleUrl: './user-profile-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileImageComponent {
  src = input<string>();
}
