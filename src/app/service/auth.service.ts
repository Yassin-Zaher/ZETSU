import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IUser } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // add type safty to ou db by providing a type 
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore) {
    this.userCollection = db.collection("users");
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
