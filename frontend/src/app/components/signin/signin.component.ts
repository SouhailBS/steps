import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {first, map} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public isValidated: boolean = false;
  public returnUrl: string = '';
  public error = '';
  public form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  public isSubmitting: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log("login")
    this.isValidated = true;
    this.isSubmitting = true;
    this.auth.login(this.form.controls['email'].value, this.form.controls['password'].value).pipe(first())
      .subscribe({
          next: data => {
            this.router.navigate([this.returnUrl]);
          },
          error: error => {
            this.error = error.error.message;
            this.isSubmitting = false;
          }
        }
      );
  }
}
