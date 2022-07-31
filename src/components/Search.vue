<script setup lang="ts">
import AddUpdateTable from './AddUpdate.vue'
import Table from './Table.vue'
import Pagination from './Pagination.vue'

</script>

<template>
    <div class="mb-3">
        <label for="label_search" class="form-label">Search: </label>
        <div class="row">
            <div class="col-11">
                <input type="text" class="form-control" id="input_searchBox" v-model="input_searchBox" ref="input_searchBox" placeholder="Search with firstname or lastname">
            </div>
            <div class="col-1">
                <button type="button" id="btn_search_student" class="btn btn-primary" @click="findByFirstNameAndLastName">Search</button>
            </div>
        </div>
    </div>
    <div>
        <AddUpdateTable action="Add" :student="{'id': 0, 'fisrNamt': '', 'lastName': '', 'age': '', 'sex': ''} as Object"/>
    </div>
    <Table :student="(students as [])" />

    <!-- <Pagination /> -->
</template>

<script lang="ts">
    import axios from 'axios';
    import { PropType } from 'vue';
    import { Student } from './models/Student'

    export default {
        data() {
            return {
                input_searchBox: "",
                students: Array as PropType<Student[]>
            }
        },
        mounted() {
            this.findByFirstNameAndLastName();
        },
        methods: {
            async findByFirstNameAndLastName() {
                console.log()
                await axios.get(`/api/student/findByFirstNameAndLastName?str=${this.input_searchBox}&page=1&limit=10`)
                    .then((response) => {
                        // console.log(response.data);
                        this.students = response.data;
                    }).catch((error) => {
                        console.error(error);
                    });
            },
            async getStudents() {
                await axios.get('/api/student')
                    .then((response) => {
                        this.students = response.data;
                    }).catch((error) => {
                        console.error(error);
                    });
            }
        }
    }
</script>

<style>
</style>