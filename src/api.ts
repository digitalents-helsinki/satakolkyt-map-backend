// Copyright (C) 2019 Digitalents Helsinki

import { Router } from 'express'
import { router as mapRouter } from './map/map.router'
export const router = Router()

// Map
router.use('/map', mapRouter)
