import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IClip } from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private db: AngularFirestore) {
    this.clipsCollection = db.collection("clips");
  }

  public async storeClip(clip: IClip) {

    await this.clipsCollection.add(clip)
  }
}
