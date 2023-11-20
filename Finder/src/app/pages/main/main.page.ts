import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

pages = [
  {title: 'Inicio', url: 'home', icon: 'home-outline'},
  {title: 'Perfil', url: 'prfile', icon: 'home-outline'}
]

router = inject(Router)

  ngOnInit() {
  }

}
