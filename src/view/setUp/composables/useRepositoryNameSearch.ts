import { ref, computed } from 'vue'

export default function useRepositoryNameSearch(repositories: any) {
    let query = ref("苹果")
    const repositoriesMatchingSearchQuery = computed(() => {
        console.log('repositories', repositories.value)
        if(repositories.value && repositories.value.length > 0) {
            return repositories.value.filter((item: string) => item.includes(query.value))
        } else {
            return "暂无数据"
        }
    })
    return {
        repositoriesMatchingSearchQuery
    }
}