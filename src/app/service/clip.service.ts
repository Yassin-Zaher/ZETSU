import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IClip } from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService implements Resolve<IClip | null> {
  private clipsCollection: AngularFirestoreCollection<IClip>;
  pageClips: IClip[] = []
  pendingRequest = false

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router) {
    this.clipsCollection = db.collection("clips");
  }

  storeClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clip)
  }


  // we are returning new Obs 
  // that contains the clips or empty array if it's empty(unAuth)
  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort$])
      .pipe(
        // return an array
        switchMap(values => {
          const [user, sort] = values
          if (!user) {
            return of([])
          }
          const query = this.clipsCollection.ref.where(
            'uid', '==', user.uid
          ).orderBy(
            'timestamp',
            sort === '1' ? 'desc' : 'asc'
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
    const screeShotRef = this.storage.ref(`screenshots/${clip.screenShotFileName}`)

    await clipRef.delete()
    await screeShotRef.delete()


    await this.clipsCollection.doc(clip.docId).delete()
  }

  async getClips() {
    if (this.pendingRequest) {
      return
    }

    this.pendingRequest = true
    let query = this.clipsCollection.ref.orderBy(
      'timestamp', 'desc'
    ).limit(6)

    const { length } = this.pageClips

    if (length) {
      const lastDocID = this.pageClips[length - 1].docId
      const lastDoc = await this.clipsCollection.doc(lastDocID)
        .get()
        .toPromise()

      query = query.startAfter(lastDoc)

    }


    const snapshot = await query.get()

    snapshot.forEach(doc => {
      this.pageClips.push({
        docId: doc.id,
        ...doc.data()
      })
    })
    this.pendingRequest = false


  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.clipsCollection.doc(route.params['id'])
      .get()
      .pipe(
        map(snapshot => {
          const data = snapshot.data()

          if (!data) {
            this.router.navigate(['/'])
            return null
          }

          return data
        })
      )
  }

}
