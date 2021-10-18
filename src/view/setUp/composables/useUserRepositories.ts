import { ref, onMounted, watch } from 'vue'

export default function useUserRepositories(user: any) {
    let arr: string[] = []
    const repositories = ref(arr);
    const getUserRepositories = async () => {
        repositories.value = await fetchUserRepositories(user.value)
    }

    onMounted(getUserRepositories)
    watch(user, getUserRepositories)

    return {
        repositories
    }
}

interface MapStore {
    [propName: string]: string[]
}

const store: MapStore = {
    'zhou': ['苹果', '梨', '香蕉'],
    'li': ['西瓜', '榴莲', '桃'],
}
function fetchUserRepositories(user: string): Promise<string[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(store[user])
        }, 1000);
    })
}