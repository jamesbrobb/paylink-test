import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "../models/data";


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  readonly #http = inject(HttpClient);

  getUserById(id: string): Observable<UserProfile> {
    return this.#http.get<UserProfile>(`http://localhost:3000/user/${id}`);
  }
}
