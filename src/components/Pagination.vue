<template>
    <div class="mb-3">
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <template v-for="index in totalPage" :key="index">
                    <li class="page-item"><button class="page-link" @click="searchWithPage">{{ index }}</button></li>
                </template>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
        Total: {{ count }}
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import { PropType } from 'vue';

    export default {
        data() {
            return {
                count: 0,
                totalPage: 0
            }
        },
        mounted() {
            this.coutnStudents();
        },
        methods: {
            async coutnStudents() {
                await axios.get('/api/student/findByFirstNameAndLastNameSize')
                    .then((response) => {
                        this.count = response.data.count;
                        this.totalPage = Math.ceil(this.count / 10);
                    }).catch((error) => {
                        console.error(error);
                    });
            },
            searchWithPage() {
                console.log(this.$root.$emit('Search')); //like this
            }
        }
    }
</script>

<style>
</style>