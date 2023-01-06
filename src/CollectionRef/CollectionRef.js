import { db } from '../firebase';
import { collection } from 'firebase/firestore';

export const dataCollectionRef = collection(db, 'data')
export const officeCollectionRef = collection(db, 'office')
export const userCollectionRef = collection(db, 'user')