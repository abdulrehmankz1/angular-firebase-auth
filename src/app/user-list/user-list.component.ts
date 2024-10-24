import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    const userCollection = collection(this.firestore, 'users');
    const userDocs = await getDocs(userCollection);
    this.users = userDocs.docs.map(doc => doc.data() as User);
  }
}
