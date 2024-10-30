import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ProfileService } from '../services/profile.service';
import { AuthService } from 'src/app/common/service/auth.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { ConfigService } from 'src/app/common/service/config.service';
import { SpinnerService } from 'src/app/common/service/spinner.service';

export interface ILinks {
  label: string;
  path: string;
}

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
  ],
})
export class ProfileComponent implements OnInit {
  userName!: string;

  constructor(
    private _router: Router,
    private _bottomSheet: MatBottomSheet,
    // private _profileService: ProfileService,
    private _authService: AuthService,
    private _configService: ConfigService,
    private _spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.getAccountInfo();
    this.userName = this._configService.userId;
  }

  navigateToAllTransactions() {
    this._router.navigate(['all-transactions']);
  }

  getAccountInfo() {
    // this._profileService.getAccountInfo().subscribe({
    //   next: (data) => {
    //     if (data) {
    //       this.userName = data.firstName + ' ' + data.lastName;
    //     }
    //   },
    // });
  }

  editProfile() {
    this._bottomSheet
      .open(EditProfileComponent)
      .afterDismissed()
      .subscribe({
        next: (refresh) => {
          if (refresh) {
            console.log('test');
          }
        },
      });
  }

  logout() {
    this._spinner.show();
    this._authService.logout().subscribe({
      next: () => {
        this._router.navigate(['login']);
        this._spinner.hide();
      },
    });
  }
}
