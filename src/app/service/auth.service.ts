import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IUser } from "../models/user.model";
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // add type safty to ou db by providing a type 
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticatedAfterDelay$: Observable<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.userCollection = db.collection("users");

    //new Observable, whose subscription logic is based on the first Observable.
    // the new observable is boolean type
    this.isAuthenticatedAfterDelay$ = auth.user.pipe(
      delay(1000),
      map(user => !!user)
    )
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )

  }


  async registerUser(user: IUser) {
    if (!user.password) {
      throw Error("Password must be provided")
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      user.email, user.password
    )

    if (!userCred.user) {
      throw Error("Can't find user")
    }

    // store user info in the firestore db
    await this.userCollection.doc(userCred.user.uid).set({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      age: user.age
    })

    // update the user to have name
    await userCred.user.updateProfile({
      displayName: user.name
    })
  }

}
