<script setup lang="ts">
    import { ref, toRefs } from 'vue'
    import useUserRepositories from './composables/useUserRepositories'
    import useRepositoryNameSearch from './composables/useRepositoryNameSearch'
    const props = defineProps({
        user: {
            type: String,
            required: true,
            default: 'zhou'
        }
    })

    let { user } = toRefs(props)

    const {
        repositories
    } = useUserRepositories(user)
    const { repositoriesMatchingSearchQuery } = useRepositoryNameSearch(repositories)
    console.log(repositoriesMatchingSearchQuery.value)
</script>

<template>
    <div>{{repositoriesMatchingSearchQuery}}</div>
</template>

<style>

</style>
