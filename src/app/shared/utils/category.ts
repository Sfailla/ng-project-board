import { Category } from '@generated/types'

export const getCategoryId = (categories: Category[], name: string) =>
  categories.find(category => category.name === name)?.id

export const getCategoryStatus = (categories: Category[], name: string) =>
  categories.find(category => category.name === name)?.status
