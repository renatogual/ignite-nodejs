/* eslint-disable prettier/prettier */
import { Request, Response } from "express"

import { ListCategoriesUseCase } from "./listCategoriesUseCase"

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

  handle(req: Request, res: Response): Response {
    const all = this.listCategoriesUseCase.execute()

    return res.json(all)
  }
}
