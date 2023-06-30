import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().pipe(
      catchError((error) => {
        console.log(error);
        return of(null); // Retorna un observable nulo para que el flujo pueda continuar
      })
    ).subscribe(
      (response: any) => {
        if (response) { // Comprueba si la respuesta no es nula antes de usarla
          console.log(response);
          this.message = response;
        }
      }
    );
  }
}
