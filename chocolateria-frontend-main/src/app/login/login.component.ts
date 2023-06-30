import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  login() {
    this.userService.login(this.loginForm.value).pipe(
      catchError((error) => {
        console.log(error);
        return of(null); // Retorna un observable nulo para que el flujo pueda continuar
      })
    ).subscribe(
      (response: any) => {
        if (response) { // Comprueba si la respuesta no es nula antes de usarla
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        }
      }
    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }
}
