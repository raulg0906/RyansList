const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/categories", function(req, res, next) {
  const sql = `
   SELECT 
   child_categories.id, 
   child_categories.name, 
   child_categories.slug, 
   parent_categories.name as parentName,
   parent_categories.id as parentId, 
   parent_categories.slug as parent_slug
   FROM 
   categories child_categories
   LEFT JOIN 
   categories parent_categories on child_categories.parent_id = parent_categories.id
    `;

  db.query(sql, (err, results, fields) => {
    const cats = results
      .filter(category => category.parentId === null)
      .map(parent => {
        return {
          id: parent.id,
          slug: parent.slug,
          name: parent.name,
          child_categories: results
            .filter(child => {
              return child.parentId === parent.id;
            })
            .map(child => {
              return {
                id: child.id,
                slug: child.slug,
                name: child.name,
                child_categories: []
              };
            })
        };
      });
    res.json(cats);
  });
});

router.get("/category/:slug", (req, res, next) => {
  const sql = "SELECT id, name FROM categories WHERE slug = ?";

  db.query(sql, [req.params.slug], (err, results, fields) => {
    res.json(results[0]);
  });
});

router.get("/listings/:categoryId", (req, res, next) => {
  const sql = `
  SELECT l.id, l.name, l.listing
  FROM listings l
  LEFT JOIN categories c ON l.category_id = c.id
  WHERE c.id = ?
  `;
  db.query(sql, [req.params.categoryId], (err, results, fields) => {
    res.json(results);
  });
});

router.get("/listing/:id", (req, res, next) => {
  const sql = `
  SELECT 
   l.id, l.name, l.listing, c.slug
  FROM 
   listings l 
   LEFT JOIN categories c ON l.category_id = c.id
  WHERE l.id = ?
  `;
  db.query(sql, [req.params.id], (err, results, fields) => {
    res.json(results[0]);
  });
});

router.post("/listing", (req, res, next) => {
  const sql = `
  INSERT INTO listings (name, listing,category_id) VALUES (?, ?, ?)`;

  db.query(
    sql,
    [req.body.name, req.body.listing, req.body.category_id],
    (err, results, fields) => {
      res.json({
        id: results.insertID,
        name: req.body.name,
        listing: req.body.listing
      });
    }
  );
});

module.exports = router;
