import { PATHS } from "@/router.config"
import { getAPIResponse } from "@/utils/get-api-response"

export interface CategoryListAPIProps {}

export const getCategoryList = async () => {
  const data = await getAPIResponse({
    apiPath: PATHS.CATEGORY.LIST().home,
  })
  return data as string[]
}
