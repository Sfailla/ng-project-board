import { Category } from '@generated/types'

export const getCategoryId = (name: string, categories: Category[]) =>
  categories.find(category => category.name === name)?.id

export const categoryStatusMap: Record<string, string> = {
  Open: 'open',
  'In Progress': 'in-progress',
  'In Review': 'in-review',
  Complete: 'complete'
} as const
