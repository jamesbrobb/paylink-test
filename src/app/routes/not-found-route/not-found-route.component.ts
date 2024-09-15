import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pl-not-found-route',
  standalone: true,
  imports: [],
  templateUrl: './not-found-route.component.html',
  styleUrl: './not-found-route.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundRouteComponent {

}
