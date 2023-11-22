import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })
  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
  ) { }

  ngOnInit() {
  }
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.presentLoading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(async res => {


        this.getUserInfo(res.user.uid);

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'warning',
          icon: 'alert-circle-outline',
          position: 'middle'
        });


      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.presentLoading();
      await loading.present();

      let path = `users/${uid}`;


      this.firebaseSvc.getDocument(path).then((user: User | undefined)  => {
        if (user) {
          this.utilsSvc.saveInLocalStorage('user', user);
          this.utilsSvc.routerLink('/main/home');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Te damos la Bienvenida ${user.name}` ,
            duration: 2500,
            color: 'success',
            icon: 'person-circle-outline',
            position: 'middle'
          });
        } else {
        // Puedes manejar el caso donde 'user' es undefined aquí
          console.log('User information not found');
        // Por ejemplo, mostrar un mensaje al usuario o tomar otra acción
        }
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'warning',
          icon: 'alert-circle-outline',
          position: 'middle'
        });
      }).finally(() => {
        loading.dismiss();
      });
}
  }
}
