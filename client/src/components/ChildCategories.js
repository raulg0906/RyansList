import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ChildCategories = props => (
  <Fragment>
    {props.list.map(cat => (
      <div key={"child-cat-" + cat.id}>
        <Link to={"/" + cat.slug}>{cat.name}</Link>
      </div>
    ))}
  </Fragment>
);

export default ChildCategories;
