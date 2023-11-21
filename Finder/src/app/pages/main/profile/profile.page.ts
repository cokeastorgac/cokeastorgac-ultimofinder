import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.models';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)
  ngOnInit() {
  }

    //usuario
    user(): User{
      return this.utilsSvc.getFromLocalStorage('user')
    }

    //tomar foto con la camara
  async takeImage() {

    let user = this.user();
    let path = `users/${user.uid}`

    const dataUrl = (await this.utilsSvc.takePicture('Imagen del Perfil')).dataUrl;

    const loading = await this.utilsSvc.presentLoading();
    await loading.present()


    let imagePath = `${user.uid}/profile`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

       this.firebaseSvc.updateDocument(path,{image: user.image}).then(async res => {

   this.utilsSvc.saveInLocalStorage('user', user)

    this.utilsSvc.presentToast({
         message: 'Imagen actualizada correctamente',
         duration: 2800,
       color: 'success',
         position: 'bottom',
         icon: 'checkmark-circle-outline'
       })
       console.log(res);

       //control de error metodo catch
     }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
       message: error.message,
        duration: 2800,
        color: 'primary',
        position: 'bottom',
       icon: 'alert-circle-outline'
       })
       //cierra el loading
     }).finally(() => {
      loading.dismiss();
    })
   }
  }



