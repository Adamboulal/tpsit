const express = require("express");
const router = express.Router();
let { items } = require("../data/db"); // uso let perché modificheremo l’array

/**
 * GET /api/items
 * Recupera tutti gli elementi
 */
router.get("/", (req, res) => {
  res.json(items);
});

/**
 * GET /api/items/:id
 * Recupera un elemento per ID
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Elemento non trovato" });
  }

  res.json(item);
});

/**
 * POST /api/items
 * Crea un nuovo elemento
 */
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Il campo 'name' è obbligatorio" });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

/**
 * PUT /api/items/:id
 * Modifica un elemento
 */
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Elemento non trovato" });
  }

  if (!name) {
    return res.status(400).json({ message: "Il campo 'name' è obbligatorio" });
  }

  items[itemIndex].name = name;

  res.json(items[itemIndex]);
});

/**
 * DELETE /api/items/:id
 * Elimina un elemento
 */
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Elemento non trovato" });
  }

  const deleted = items[itemIndex];

  items = items.filter(i => i.id !== id);

  res.json({
    message: "Elemento eliminato con successo",
    deleted
  });
});

module.exports = router;
