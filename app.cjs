const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "root",
  database: "eshop",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à MySQL");
});

const isAdmin = (req, res, next) => {
  if (req.headers["role"] !== "admin") {
    return res.status(403).send("Forbidden: Admin access required");
  }
  next();
};

const isClientOrAdmin = (req, res, next) => {
  const role = req.headers["role"];
  if (role !== "client" && role !== "admin") {
    return res.status(403).send("Forbidden: Client or Admin access required");
  }
  next();
};

app.get("/product", isClientOrAdmin, (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.json(results);
    }
  });
});

app.get("/product/:id", isClientOrAdmin, (req, res) => {
  const sql = "SELECT * FROM product WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res.status(500).send("Erreur serveur");
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Produit non trouvé");
    }
  });
});

app.post("/product", isAdmin, (req, res) => {
  const { id, name, description, prix, note, image_url, category_id } = req.body;

  if (!id || !name || !prix || !note || !image_url || !category_id) {
    return res.status(400).send("Tous les champs (id, name, prix, note, image_url, category_id) doivent être remplis.");
  }

  const sql = "INSERT INTO product (id, name, description, prix, note, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, name, description, prix, note, image_url, category_id], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion dans la base de données:", err);
      return res.status(500).send("Erreur serveur");
    }
    res.status(201).json({ id, name, description, prix, note, image_url, category_id });
  });
});

app.put("/product/:id", (req, res) => {
  const { name, description, prix, note, image_url } = req.body;
  const sql = "UPDATE product SET name=?, description=?, prix=?, note=?, image_url=? WHERE id=?";
  db.query(sql, [name, description, prix, note, image_url, req.params.id], (err, result) => {
    if (err) return res.status(500).send("Erreur serveur");
    res.send("Produit mis à jour avec succès !");
  });
});

app.delete("/product/:id", isAdmin, (req, res) => {
  const sql = "DELETE FROM product WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression des données:", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.send("Produit supprimé avec succès !");
    }
  });
});

app.post("/category", isAdmin, (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).send("Le id et le nom de la catégorie sont requis");
  }
  const sql = "INSERT INTO category (id, name) VALUES (?, ?)";
  db.query(sql, [id, name], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion dans la base de données:", err);
      return res.status(500).send("Erreur serveur");
    }
    res.status(201).json({ id, name });
  });
});

app.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des catégories:", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.json(results);
    }
  });
});

app.get("/category/:id", (req, res) => {
  const sql = "SELECT * FROM category WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la catégorie:", err);
      return res.status(500).send("Erreur serveur");
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Catégorie non trouvée");
    }
  });
});

app.put("/category/:id", isAdmin, (req, res) => {
  const { name, new_id } = req.body;

  if (!name) {
    return res.status(400).send("Le nom de la catégorie est requis");
  }

  let sql = "UPDATE category SET name = ? WHERE id = ?";
  const values = [name, req.params.id];

  if (new_id) {
    sql = "UPDATE category SET name = ?, id = ? WHERE id = ?";
    values.push(new_id);
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la catégorie:", err);
      return res.status(500).send("Erreur serveur");
    }
    res.send("Catégorie mise à jour avec succès !");
  });
});

app.delete("/category/:id", isAdmin, (req, res) => {
  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de la catégorie:", err);
      return res.status(500).send("Erreur serveur");
    }
    res.send("Catégorie supprimée avec succès !");
  });
});

app.get("/user", isAdmin, (req, res) => {
    const filePath = path.join(__dirname, "./data/submittedForms.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Erreur serveur");
      }
      const users = data ? JSON.parse(data) : [];
      res.json(users);
    });
  });
  
  app.delete("/user/:email", isAdmin, (req, res) => {
    const { email } = req.params;
    const filePath = path.join(__dirname, "./data/submittedForms.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return res.status(500).send("Erreur serveur");
      let users = data ? JSON.parse(data) : [];
      users = users.filter(user => user.email !== email);
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).send("Erreur de suppression de l'utilisateur");
        res.send("Utilisateur supprimé avec succès");
      });
    });
  });
  
  app.post("/user", isAdmin, (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;
  
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).send("Tous les champs (firstname, lastname, email, password, role) doivent être remplis.");
    }
  
    const newUser = { firstname, lastname, email, password, role };
    const filePath = path.join(__dirname, "./data/submittedForms.json");
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return res.status(500).send("Erreur serveur");
  
      let users = data ? JSON.parse(data) : [];
  
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        return res.status(400).send("Cet utilisateur existe déjà");
      }
      users.push(newUser);
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).send("Erreur lors de l'ajout de l'utilisateur");
        res.status(201).json(newUser);
      });
    });
  });

  app.post("/validateForm", (req, res) => {
    const formData = req.body.form;
    const filePath = path.join(__dirname, "./data/submittedForms.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      const formsData = data ? JSON.parse(data) : [];
      const emailExists = formsData.some(entry => entry.email.toLowerCase() === formData.email);
      if (emailExists) {
        return res.status(400).json({ error: "Cet email est déjà utilisé" });
      }
      formsData.push(formData);
      fs.writeFile(filePath, JSON.stringify(formsData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Impossible de sauvegarder les données" });
        res.json({ message: "Les données du formulaire ont été sauvegardées avec succès", data: formData });
      });
    });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, "./data/submittedForms.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Impossible de lire les données utilisateur" });
      const users = data ? JSON.parse(data) : [];
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (user && user.password === password) {
        res.json({ success: true });
      } else {
        res.json({ error: "Email ou mot de passe incorrect" });
      }
    });
  });
  
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});