import React, { useEffect } from "react";
import { getListing } from "../actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Listing = props => {
  useEffect(() => {
    getListing(props.id);
  }, [props.id]);

  return (
    <div>
      <Link to={"/" + props.slug}>&lt;Back to category</Link>
      <p>{props.name}</p>
      <p>{props.listing}</p>
    </div>
  );
};

function mapStateToProps(appState, ownProps) {
  console.log(appState);
  return {
    name: appState.currentListing.name,
    listing: appState.currentListing.listing,
    id: ownProps.match.params.id,
    slug: appState.currentListing.slug
  };
}

export default connect(mapStateToProps)(Listing);
