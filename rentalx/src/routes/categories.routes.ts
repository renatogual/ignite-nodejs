import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    res.status(400).json({ error: "Category already exists!" });
  }

  categoriesRepository.create({ name, description });

  res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();

  res.json(all);
});

export { categoriesRoutes };
