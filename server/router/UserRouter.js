const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.get(`/users`, async (req, res) => {
  try {
    let query = "select * from sera.public.users";
    pool.query(query, (error, result) => {
      if (error) throw error;
      res.send({ data: result.rows });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get(`/users/:userID`, async (req, res) => {
  try {
    const { userID } = req.params;
    const queryUser = "SELECT * FROM users WHERE id = $1";
    const queryCollectionsLikes =
      "SELECT collection_id FROM user_collection_likes WHERE user_id = $1";
    const queryMangasLikes =
      "SELECT manga_id FROM user_manga_likes WHERE user_id = $1";
    const queryCollectionsComment =
      "SELECT * FROM user_collection_commentary WHERE user_id = $1";
    const queryMangasLikesComment =
      "SELECT * FROM user_manga_commentary WHERE user_id = $1";
    const queryMangasCollection =
      "SELECT * FROM user_my_collection WHERE user_id = $1";

    const userResult = await pool.query(queryUser, [userID]);
    const collectionsLikesResult = await pool.query(queryCollectionsLikes, [
      userID,
    ]);
    const mangasLikesResult = await pool.query(queryMangasLikes, [userID]);
    const collectionsCommentaryResult = await pool.query(
      queryCollectionsComment,
      [userID],
    );
    const mangasCommentaryResult = await pool.query(queryMangasLikesComment, [
      userID,
    ]);
    const userMyCollectionResult = await pool.query(queryMangasCollection, [
      userID,
    ]);

    const user = userResult.rows[0];
    const collectionLikesIds = collectionsLikesResult.rows.map(
      (row) => row.collection_id,
    );
    const mangaMyCollectionIds = userMyCollectionResult.rows.map(
      (row) => row.manga_id,
    );
    const mangaLikesIds = mangasLikesResult.rows.map((row) => row.manga_id);

    const collectionCommentIds = collectionsCommentaryResult.rows.map((row) => {
      return {
        collection_Id: row.collection_id,
        title: row.title,
        commentary: row.commentary,
      };
    });
    const mangaCommentIds = mangasCommentaryResult.rows.map((row) => {
      return {
        comment_id: row.commentary_id,
        manga_Id: row.manga_id,
        title: row.title,
        commentary: row.commentary,
      };
    });

    res.send({
      user: user,
      collectionsLikes: collectionLikesIds,
      mangasLikes: mangaLikesIds,
      collectionComment: collectionCommentIds,
      mangaComment: mangaCommentIds,
      myCollection: mangaMyCollectionIds,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    let { email, pseudo, password } = req.body;
    const testString = /^[a-zA-Z0-9_]+$/;
    const testMaj = /[A-Z]/;

    if (pseudo.length <= 3 && !testString.test(pseudo)) {
      res.status(400).send({
        error: "Le pseudo ne peut contenir aucun caractère spécial à part (_).",
      });
      return;
    }
    if (password.length < 7 || !testMaj.test(password)) {
      res.status(400).send({
        error:
          "Le mot de passe doit contenir au moins une majuscule et 7 caractères.",
      });
      return;
    }

    let checkEmail = "SELECT * FROM users WHERE email = $1;";
    let checkPseudo = "SELECT * FROM users WHERE pseudo = $1;";

    const emailResult = await pool.query(checkEmail, [email]);
    if (emailResult.rowCount > 0) {
      res.status(400).send({ error: "Email already exists" });
      return;
    }
    const pseudoResult = await pool.query(checkPseudo, [pseudo]);
    if (pseudoResult.rowCount > 0) {
      res.status(400).send({ error: "Pseudo already exists" });
      return;
    }

    let insert =
      "INSERT INTO users (email, pseudo, password) VALUES ($1, $2, $3) RETURNING *;";
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      pool.query(insert, [email, pseudo, hash], (error, result) => {
        if (error) throw error;
        console.log(result.rows);
        res.status(200).send({ loggedIn: true, data: result.rows[0] });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    let { login, password } = req.body;

    let userSignIn = await pool.query(
      `select *
             from users
             where email = $1
                or pseudo = $1`,
      [login],
      (err, result) => {
        if (result.rowCount > 0) {
          bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              res.send({ loggedIn: true, data: result.rows[0] });
            } else {
              res
                .status(400)
                .send({ loggedIn: false, error: "Mot de passe incorecte" });
            }
          });
        } else {
          res
            .status(400)
            .send({ loggedIn: false, error: "Utilisateur introuvable" });
        }
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/like", async (req, res) => {
  try {
    const { type, user_id, product_id } = req.body;
    let insert = "";
    if (type === "collections") {
      insert = "insert into user_collection_likes values($1, $2);";
    } else if (type === "mangas") {
      insert = "insert into user_manga_likes values($1, $2);";
    }
    pool.query(insert, [user_id, product_id], (error, result) => {
      if (error) throw error;
      res.status(200).send({ message: "liked!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/like", async (req, res) => {
  try {
    const { type, user_id, product_id } = req.body;
    let drop = "";
    if (type === "collections") {
      drop =
        "delete from user_collection_likes where user_id=$1 and collection_id=$2";
    } else if (type === "mangas") {
      drop = "delete from user_manga_likes where user_id=$1 and manga_id=$2";
    }
    pool.query(drop, [user_id, product_id], (error, result) => {
      if (error) throw error;
      res.status(200).send({ message: "disliked!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/commentary", async (req, res) => {
  try {
    const { type, user_id, product_id, title, commentary } = req.body;
    let insert = "";
    if (type === "collections") {
      insert =
        "insert into user_collection_commentary(user_id, collection_id, commentary, title) values($1, $2, $3, $4);";
    } else if (type === "mangas") {
      insert =
        "insert into user_manga_commentary(user_id, manga_id, commentary, title) values($1, $2, $3, $4);";
    }
    pool.query(
      insert,
      [user_id, product_id, commentary, title],
      (error, result) => {
        if (error) throw error;
        res.status(200).send({ message: "Commentary!" });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/commentary/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { type } = req.query;
    let queryComment = "";
    if (type === "collections") {
      queryComment =
        "select * from user_collection_commentary where collection_id=$1;";
    } else if (type === "mangas") {
      queryComment = "select * from user_manga_commentary where manga_id=$1;";
    }
    let queryUser = "select * from users where id=$1";
    pool.query(queryComment, [productId], (error, result) => {
      if (error) throw error;
      res.status(200).send({ data: result.rows });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/commentary", async (req, res) => {
  try {
    const { type, comment_id } = req.body;
    let deleteComment = "";
    if (type === "collections") {
      deleteComment =
        "delete from user_collection_commentary where commentary_id=$1;";
    } else if (type === "mangas") {
      deleteComment =
        "delete from user_manga_commentary where commentary_id=$1;";
    }
    pool.query(deleteComment, [comment_id], (error, result) => {
      if (error) throw error;
      res.status(200).send({ message: "comment" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/addtocollection", async (req, res) => {
  try {
    const { user_id, manga_id } = req.body;
    let insert = "insert into user_my_collection values($1, $2);";
    pool.query(insert, [user_id, manga_id], (error, result) => {
      if (error) throw error;
      res.status(200).send({ message: "add to collection" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/addtocollection", async (req, res) => {
  try {
    const { user_id, manga_id } = req.body;
    let drop =
      "delete from user_my_collection where user_id=$1 and manga_id=$2;";
    pool.query(drop, [user_id, manga_id], (error, result) => {
      if (error) throw error;
      res.status(200).send({ message: "add to collection" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/collections/:mangaId", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
