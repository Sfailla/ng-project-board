import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import {
  CreateCategoryMutation,
  CreateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryDocument,
  DeleteCategoryMutation,
  DeleteCategoryDocument,
  UpdateCategoriesMutation,
  UpdateCategoriesDocument
} from '@generated/mutations'
import { CategoryInput } from '@generated/types'
import { map } from 'rxjs/internal/operators/map'
import {
  CategoriesDocument,
  CategoriesQuery,
  CategoryDocument,
  CategoryQuery
} from '@generated/queries'
import { updateApolloCache } from '@shared/utils'
import { ApolloCache } from '@apollo/client'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apollo: Apollo = inject(Apollo)

  getCategoriesQuery() {
    return this.apollo.query<CategoriesQuery>({
      query: CategoriesDocument
    })
  }

  getCategories() {
    return this.getCategoriesQuery().pipe(map(({ data: { categories } }) => categories))
  }

  getCategoryQuery(categoryId: string) {
    return this.apollo.query<CategoryQuery>({
      query: CategoryDocument,
      variables: { categoryId }
    })
  }

  getCategory(categoryId: string) {
    return this.getCategoryQuery(categoryId).pipe(map(({ data: { category } }) => category))
  }

  createCategoryCacheUpdate<T extends CategoriesQuery, D extends CreateCategoryMutation>() {
    return (store: ApolloCache<T>, storeData: T, data: D) => {
      const { categories } = storeData

      store.writeQuery<CategoriesQuery>({
        query: CategoriesDocument,
        data: { categories: [...categories, data.createCategory] }
      })
    }
  }

  createCategoryMutation(category: CategoryInput) {
    return this.apollo.mutate<CreateCategoryMutation>({
      mutation: CreateCategoryDocument,
      variables: { category },
      update: updateApolloCache<CategoriesQuery, CreateCategoryMutation>(
        CategoriesDocument,
        this.createCategoryCacheUpdate()
      )
    })
  }

  createCategory(category: CategoryInput) {
    return this.createCategoryMutation(category).pipe(map(({ data }) => data?.createCategory))
  }

  updateCategoryMutation(category: CategoryInput) {
    return this.apollo.mutate<UpdateCategoryMutation>({
      mutation: UpdateCategoryDocument,
      variables: { input: category }
    })
  }

  updateCategory(category: CategoryInput) {
    return this.updateCategoryMutation(category).pipe(map(({ data }) => data?.updateCategory))
  }

  updateCategoriesMutation(categories: CategoryInput[]) {
    return this.apollo.mutate<UpdateCategoriesMutation>({
      mutation: UpdateCategoriesDocument,
      variables: { updatedCategories: categories }
    })
  }

  updateCategories(categories: CategoryInput[]) {
    return this.updateCategoriesMutation(categories).pipe(map(({ data }) => data?.updateCategories))
  }

  deleteCategoryCacheUpdate<T extends CategoriesQuery>(categoryId: string) {
    return (store: ApolloCache<T>, storeData: T) => {
      const { categories } = storeData

      store.writeQuery<CategoriesQuery>({
        query: CategoriesDocument,
        data: { categories: categories.filter(category => category.id !== categoryId) }
      })
    }
  }

  deleteCategoryMutation(categoryId: string) {
    return this.apollo.mutate<DeleteCategoryMutation>({
      mutation: DeleteCategoryDocument,
      variables: { categoryId },
      update: updateApolloCache(CategoriesDocument, this.deleteCategoryCacheUpdate(categoryId))
    })
  }

  deleteCategory(categoryId: string) {
    return this.deleteCategoryMutation(categoryId).pipe(map(({ data }) => data?.deleteCategory))
  }
}
