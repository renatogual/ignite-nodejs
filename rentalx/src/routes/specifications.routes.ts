import { Router } from 'express'

import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository'
import { CreateSpecificationService } from '../../modules/cars/services/CreateSpecificationService'

const specificationsRoutes = Router()
const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  const createCategoryService = new CreateSpecificationService(
    specificationsRepository
  )

  createCategoryService.execute({ name, description })

  res.status(201).send()
})

specificationsRoutes.get('/', (req, res) => {
  const all = specificationsRepository.list()

  res.json(all)
})

export { specificationsRoutes }
