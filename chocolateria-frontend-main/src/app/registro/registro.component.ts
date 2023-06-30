import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userFirstName: new FormControl('', Validators.required),
    userLastName: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.userService.register(this.registerForm.value).pipe(
      catchError((error) => {
        console.log(error);
        return of(null); // Retorna un observable nulo para que el flujo pueda continuar
      })
    ).subscribe(
      (response) => {
        if (response) { // Comprueba si la respuesta no es nula antes de usarla
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
