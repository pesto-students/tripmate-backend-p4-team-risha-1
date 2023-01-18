import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp , cert} from 'firebase-admin/app'
var serviceAccount = require("../credfb.json");
const { Storage } = require("@google-cloud/storage");
const functions = require("firebase-functions");
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://uploadphotos-4ccff.appspot.com"
});

export const blogRef = getFirestore().collection("blogref");
blogRef.doc().id;

const storage = new Storage({
  keyFilename: "./credfb.json",
}
);
export const bucket = getStorage().bucket();
export const photoUrl = "https://firebasestorage.googleapis.com/v0/b/uploadphotos-4ccff.appspot.com/o/";

