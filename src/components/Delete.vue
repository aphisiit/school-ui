<template>
    <div>
    <!-- Button trigger modal -->
        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" :data-bs-target="'#modalDeleteStudent' + [student?.id]">
            Delete
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'modalDeleteStudent' + [student?.id]" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" :aria-labelledby="'modalDeleteStudent' + [student?.id] + 'Label'" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteStudentModalLabel">Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Do you want to delete <label style="font-weight:bold; color:red">{{ student?.fisrtName + " " + student?.lastName}}</label> ?

                    </div>
                    <div class="modal-footer">
                        <button type="button" :id="'close_del_student' + [[student?.id]]" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" @click="deleteById">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { PropType } from 'vue';
    import { Student } from './models/Student'

    defineProps({
        student: {
            type: Object as PropType<Student>,
            required: false
        }
    });
</script>

<script lang="ts">
    export default {
        data() {

        },
        methods: {
            async deleteById() {
                await axios.delete(`api/student/${this.$props.student?.id}`)
                .then((response) => {
                    const myModal = document.getElementById('close_del_student' + [this.student?.id]);
                    myModal?.click();

                    const searchBtn = document.getElementById('btn_search_student');
                    searchBtn?.click();
                })
                .catch((error) => {
                    console.error(error);
                })
            }
        }
    }    

</script>

<style>
</style>