<script setup lang="ts">
import AddUpdateTable from './AddUpdate.vue'
import DeleteStudent from './Delete.vue';

defineProps({
    student: {
        type: Array as PropType<Student[]>,
        required: false
    }
});
</script>

<template>
    <div>
        <table class="table" aria-describedby="table-example">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Age</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-for="data,index in student" :key="data.id">
                <tr>
                    <th scope="row" key="{{ data.id }}">{{ index + 1 }}</th>
                    <td>{{ data.fisrtName }}</td>
                    <td>{{ data.lastName }}</td>
                    <td>{{ data.sex }}</td>
                    <td>{{ data.age }}</td>
                    <td>
                        <div class="d-grid gap-2 d-md-flex">
                            <AddUpdateTable action="Edit" actionClass="btn btn-outline-primary" :student="(data as Object)" />
                            <DeleteStudent :student="(data as Object)" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
</style>

<script lang="ts">
    import axios from 'axios';
    import { PropType } from 'vue';
    import { Student } from './models/Student'

    export default {
        data() {
            return {
                students: this.$props.student
            }
        },
        ready() {
            this.students = this.$props.student
            console.log(this.$props.student)
        },
        mounted() {
            // console.log(this.$props.student)
            // this.getStudents();
        },
        methods: {
            async getStudents() {
                await axios.get('/api/student')
                    .then((response) => {
                        this.$props.student = response.data
                    }).catch((error) => {
                        console.error(error);
                    });
            }
        }
    }
</script>