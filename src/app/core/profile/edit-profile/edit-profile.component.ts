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
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ConfigService } from 'src/app/common/service/config.service';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { IUser } from '../profile.interface';
import { emptySpaceValidator } from 'src/app/common/validators/empty-space.validator';
import { Currencies } from '../profile.constant';

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
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currencyIcon = '';
  formSubmitted: boolean = false;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];
  currencies: any[] = Currencies;

  form: FormGroup = this._fb.group({
    firstName: ['', [Validators.required, emptySpaceValidator()]],
    lastName: ['', [Validators.required, emptySpaceValidator()]],
    age: [null, [Validators.required, Validators.min(1)]],
    currency: ['currency_rupee', Validators.required],
    mobile: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
  });

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IUser,
    private _configService: ConfigService,
    private _profileService: ProfileService,
    private _bottomSheetRef: MatBottomSheetRef<EditProfileComponent>
  ) {
    this.currencyIcon = this._configService.currencySymbol;
    this.patchData();
  }

  ngOnInit(): void {}

  patchData() {
    if (this.data) {
      this.form.setValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        age: this.data.age,
        mobile: this.data.mobile,
        currency: this.data.currency || 'currency_rupee',
      });
    }
  }

  updateProfile() {
    if (this.form.invalid || this.formSubmitted) return;
    this.formSubmitted = true;
    this.isLoading = true;
    const formData = this.form.value;
    this._profileService.updateProfileInfo(formData).subscribe({
      next: () => {
        this._configService.userInfo = formData;
        this._bottomSheetRef.dismiss(true);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
