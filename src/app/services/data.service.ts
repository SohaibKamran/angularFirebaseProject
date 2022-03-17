import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }
  getNoteById(id): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }
  // getNoteById(id): Observable<Note>{
  //   const noteRef = doc(this.firestore,`notes/${id}`);
  //   return docData(noteRef) as Observable<Note>;
  // }
  addnote(note){
    const noteRef = collection(this.firestore,'notes');
    return addDoc(noteRef,note);
  }
  // deleteNote(note){
  //   console.log(note.ID);
  //   const noteDocRef = doc(this.firestore,`notes/${note.id}`);
  //   console.log(noteDocRef);
  //   return deleteDoc(noteDocRef);
  // }
  deleteNote(note) {
    const noteRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteRef);
  }
  // deleteNote(note: Note) {
  //   const noteDocRef = doc(this.firestore, `notes/${note.id}`);
  //   return deleteDoc(noteDocRef);
  // }

  updateNote(note){
    const noteDocRef = doc(this.firestore,`notes/${note.id}`);
    updateDoc(noteDocRef,{title:note.title,text:note.text});
  }
}
