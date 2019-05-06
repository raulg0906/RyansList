import store from "../store";
import axios from "axios";

export function getCategories() {
  axios.get("/api/categories").then(resp => {
    store.dispatch({
      type: "GET_CATEGORIES",
      payload: resp.data
    });
  });
}

export function getCategory(slug) {
  axios.get("/api/category/" + slug).then(resp => {
    store.dispatch({
      type: "GET_CURRENT_CATEGORY",
      payload: resp.data
    });
  });
}

export function createListing(name, listing, categoryId) {
  axios.post("/api/listing", { name, listing, categoryId }).then(resp => {
    getListings(categoryId);
  });
}

export function getListings(categoryId) {
  axios.get("/api/listings/" + categoryId).then(resp => {
    store.dispatch({
      type: "GET_CURRENT_LISTINGS",
      payload: resp.data
    });
  });
}

export function getListing(listingId) {
  if (listingId) {
    axios.get("/api/listing/" + listingId).then(resp => {
      console.log(resp.data);
      store.dispatch({
        type: "GET_CURRENT_LISTING",
        payload: resp.data
      });
    });
  }
}
