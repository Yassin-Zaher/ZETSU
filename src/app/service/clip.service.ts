import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IClip } from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage) {
    this.clipsCollection = db.collection("clips");
  }

  storeClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clip)
  }


  // we are returning new Obs 
  // that contains the clips or empty array if it's empty(unAuth)
  getUserClips() {
    return this.auth.user.pipe(

      // return an array
      switchMap(user => {
        if (!user) {
          return of([])
        }
        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        )

        return query.get()
      }),

      map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }


  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({
      title
    })
  }


  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`)
    await clipRef.delete()


    await this.clipsCollection.doc(clip.docId).delete()
  }
}
