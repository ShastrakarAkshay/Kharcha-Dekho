import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { BottomMenuComponent } from './common/components/bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, BottomMenuComponent],
})
export class AppComponent implements OnInit {
  title = 'kharcha dekho';

  ngOnInit() {
    // this.initFirebaseApp();
  }

  initFirebaseApp() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBCewB9DeINEAHb4xI7V8Rezzmb1HQtv2w',
      authDomain: 'kharcha-dekho.firebaseapp.com',
      projectId: 'kharcha-dekho',
      storageBucket: 'kharcha-dekho.appspot.com',
      messagingSenderId: '479825737854',
      appId: '1:479825737854:web:56f8e06cea57b17486002f',
      measurementId: 'G-C6WG9Y9Y41',
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
