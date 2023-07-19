import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/base-component/base-component';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user/user.service';
import { User } from '../_models/user/user.model';
import { logConsole } from '../_helpers/log-console.util';
import { NavigationConstants } from '../shared/constants/navigation-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  focus;
  focus1;
  returnUrl: string;
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,) { 
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),]],
			password: ['', Validators.required]
		});

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || NavigationConstants.UserProfile;
  }

  onSubmit(data: User) {
    this.submitted = true;

		if (this.form.invalid) {
			this.form.setErrors({ unauthenticated: true });
			return;
		}

		this.loading = true;
		logConsole('submitting: ' + data.email);

		this.userService.login(data)
			.add(() => {
				logConsole('login completed');
				if (this.userService.isLoggedIn()) {
					logConsole('login successful');
					//this.alertService.success('Successfully Logged In', true, 5000);
					this.router.navigateByUrl(this.returnUrl);
				}
				else {
					logConsole("Log in Error");
					//this.alertService.error('Error on Login. Please re-enter your username and password carefully, or register if you do not have an account.');
					this.form.setErrors({ unauthenticated: true });
				}

				this.loading = false;
			});
  }
}
