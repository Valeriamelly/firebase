import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
