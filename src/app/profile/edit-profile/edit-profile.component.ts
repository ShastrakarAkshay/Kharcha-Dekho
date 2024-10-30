import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ConfigService } from 'src/app/common/service/config.service';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatDatepickerModule,
    FirebaseAppModule,
    FirestoreModule,
  ],
  providers: [ProfileService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currencyIcon = '';
  isEdit: boolean = false;
  formSubmitted: boolean = false;
  subscriptions: Subscription[] = [];

  form: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [null, Validators.required],
    mobile: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _configService: ConfigService
  ) {
    this.currencyIcon = this._configService.currencySymbol;
  }

  ngOnInit(): void {}

  updateProfile() {
    if (this.form.invalid || this.formSubmitted) return;
    this.formSubmitted = true;
    const formData = this.form.value;
    // this._profileService.updateProfileInfo(formData).subscribe({
    //   next: () => {
    //     this._bottomSheetRef.dismiss(true);
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
