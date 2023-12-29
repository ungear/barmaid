import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../firebase-creds.mjs";

const API_BASE_URL = "https://barmaid-api.ungear.ru/";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const drinksCollection = collection(db, 'drinks');

export const searchDrinksByName = async function(name) {
  const drinkSnap = await getDocs(drinksCollection);
  const result = drinkSnap.docs
    .map(x => Object.assign(x.data(), {_id: x.id}))
    .filter(x => x.name.toLowerCase().includes(name));
  return result
};

export const searchDrinksByIng = function(ing) {
  let url = API_BASE_URL + "drinks/by-ingredients?ingIds=" + ing.join(";");
  return axios.get(url).then(response => response.data);
};

export const getDrinkById = async function(id) {
  const docRef = doc(db, "drinks", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getDrinkFullDataById = async function(id) {
  const docRef = doc(db, "drinks", id);
  const docSnap = await getDoc(docRef);
  const drinkData = docSnap.data();
  drinkData._id = docSnap.id;
  return drinkData;
};

export const getIngredients = async function() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const ingCol = collection(db, 'ingredients');
  const ingSnap = await getDocs(ingCol);
  
  // TODO: get rid of reactive getters and setters added in the data by the firebase engine
  const ingData = ingSnap.docs.map(x => {
    const ingData = x.data();
    return {
      _id: x.id,
      ingredientName: ingData.name,
    }
  });
  return ingData;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
