import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  token: 'skAwiY14ePoGnEcweUJ4rGezHqmcaFgbXK0vBtAF9UrusVcx2JDxmqjQKr3ByrL6RUU1ggXYtrhVSe474db2q4O3OYU6bfGzwxKn6tCCTYPM034ER85dhWywjr2zwGMOskkOowjZ032VIXkpwawzI0ROyX4bx2RcrBOVh7wVXIbVyfQeL7zy',
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
