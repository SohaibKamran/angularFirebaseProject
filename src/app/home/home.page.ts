import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth/auth.service';
import { DataService, Note } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];
  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private router: Router
  ) {
    this.dataService.getNotes().subscribe((res) => {
      this.notes = res;
    });
  }
  logout(){
    this.auth
      .logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((e) => console.log(e.message));
    // this.auth.logout();
  }
  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        id: note.id,
      },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
    });
    await modal.present();
  }
  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'title',
        },
        {
          name: 'text',
          type: 'textarea',
          placeholder: 'title',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addnote({ title: res.title, text: res.text });
          },
        },
      ],
    });
    // this.dataService.addnote({title:'Sohaib',text:'hello'});
    await alert.present();
  }
  deleteN(note: Note) {
    this.dataService.deleteNote(note);
  }
}
