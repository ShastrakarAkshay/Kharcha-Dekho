import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { AuthService } from 'src/app/common/service/auth.service';
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { ILinks, IUser } from '../profile.interface';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import { Links } from '../profile.constant';
import {
  DialogService,
  IConfirmData,
} from 'src/app/common/service/dialog.service';
import { ConfigService } from 'src/app/common/service/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBottomSheetModule,
    IconComponent,
  ],
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  userData!: IUser;
  displayName: string = '';
  links: ILinks[] = Links;

  constructor(
    private _router: Router,
    private _bottomSheet: MatBottomSheet,
    private _authService: AuthService,
    private _spinner: SpinnerService,
    private _toaster: ToasterService,
    private _dialog: DialogService,
    private _configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getAccountInfo();
  }

  onItemClick(link: ILinks) {
    if (link.id === 1) {
      this.editProfile();
    } else {
      this._router.navigate([link.path]);
    }
  }

  getAccountInfo() {
    this.userData = this._configService.userInfo;
    if (!this.userData) {
      this._toaster.showWarning('Please update your profile');
      this.editProfile();
    } else {
      this.displayName = `${this.userData.firstName} ${this.userData.lastName}`;
    }
  }

  editProfile() {
    this._bottomSheet
      .open(EditProfileComponent, { data: this.userData })
      .afterDismissed()
      .subscribe({
        next: (refresh) => {
          if (refresh) {
            this.getAccountInfo();
          }
        },
      });
  }

  logout() {
    const data: IConfirmData = {
      heading: 'Confirm',
      message: 'Do you want to logout?',
    };
    this._dialog
      .confirm(data)
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            this._spinner.show();
            this._authService.logout().subscribe({
              next: () => {
                this._router.navigate(['login']);
                this._spinner.hide();
              },
            });
          }
        },
      });
  }
}
