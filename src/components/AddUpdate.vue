<template>
    <div>
    <!-- Button trigger modal -->
        <button type="button" :class="[actionClass]" data-bs-toggle="modal" :data-bs-target="'#modal' + [action] + 'Student' + [student?.id]">
            {{ action }}
        </button>   

        <!-- Modal -->
        <div class="modal fade" :ref="'modal' + [action] + 'Student' + [student?.id]" :id="'modal' + [action] + 'Student' + [student?.id]" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'modal' + [action] 'Student' + [student?.id] + 'Label'" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addEditStudentModalLabel">
                            {{ action }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label">First name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" :id="[action] + 'FirstName'" v-model="modalStudent['fisrtName']" >
                                <!-- <input type="text" class="form-control" :id="[action] + 'FirstName' + [student?.id]" :value="[student?.fisrtName]"> -->
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-3 col-form-label">Last name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" :id="[action] + 'LastName'" v-model="modalStudent['lastName']" >
                                <!-- <input type="text" class="form-control" :id="[action] + 'LastName' + [student?.id]" :value="[student?.lastName]"> -->
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-3 col-form-label">Sex</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" :id="[action] + 'Sex'" v-model="modalStudent['sex']" >
                                <!-- <input type="text" class="form-control" :id="[action] + 'Sex' + [student?.id]" :value="[student?.sex]"> -->
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-3 col-form-label">Age</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" :id="[action] + 'Age'" v-model="modalStudent['age']" >
                                <!-- <input type="text" class="form-control" :id="[action] + 'Age' + [student?.id]" :value="[student?.age]"> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" :id="'btn_close_' + [student?.id]"  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveChange()">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PropType } from 'vue';
    import { Student } from './models/Student'

    defineProps({
        student: {
            type: Object as PropType<Student>,
            required: false
        },
        action: {
            type: String,
            required: false
        },
        actionClass: {
            type: String,
            required: false,
            default: "btn btn-primary"
        }
    })
</script>

<script lang="ts">
    import axios from 'axios';

    export default {
        data() {
            return {
                modalStudent: Object as PropType<Student>,
                fisrtName: "",
                lastName: "",
                age: "",
                sex: ""
            }
        },
        mounted() {
            this.modalStudent = this.$props.student;
        },
        methods: {
            hideModal() {
                // console.log(this.$refs[str]);
                const myModal = document.getElementById('btn_close_' + [this.student?.id]);
                myModal?.click();
            },
            async saveChange() {
                // console.log(this.$props.student);
                if(!this.modalStudent.id) {
                    await axios.post(`/api/student`, this.modalStudent, {
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    .then((response) => {
                        // console.log(`modal${this.$props.action}Student${this.student?.id}`)
                        this.hideModal()
                    }).catch((error) => {
                        console.error(error);
                    });
                } else {
                    await axios.put(`/api/student/${this.modalStudent.id}`, this.modalStudent, {
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    .then((response) => {
                        // console.log(`modal${this.$props.action}Student${this.student?.id}`)
                        this.hideModal()
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
        }
    }
    
</script>