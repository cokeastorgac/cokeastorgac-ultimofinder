import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService
  )
  {}

pages = [
  {title: 'Inicio', url: 'home', icon: 'home-outline'},
  {title: 'Perfil', url: 'prfile', icon: 'home-outline'}
]

router = inject(Router);

currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url
    })
  }

  //cerrar sesion
signOut(){
  this.firebaseSvc.signOut();
}
}


