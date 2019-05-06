import React, { useEffect } from "react";
import { getCategory, getListings } from "../actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CurrentCategory = props => {
  useEffect(() => {
    getCategory(props.slug);
    getListings(props.categoryId);
  }, [props.slug, props.categoryId]);

  return (
    <div>
      <h1> {props.name}</h1>
      <ul>
        {props.currentListings.map(listing => (
          <li key={"listing" + listing.id} style={{ display: "flex" }}>
            <p>
              <Link to={"/listing/" + listing.id}>{listing.name}</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps(appState, ownProps) {
  console.log("appstate", appState);
  return {
    name: appState.currentCategory.name,
    slug: ownProps.match.params.slug,
    categoryId: appState.currentCategory.id,
    currentListings: appState.currentListings
  };
}
export default connect(mapStateToProps)(CurrentCategory);
