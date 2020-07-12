<template>
    <div>
        <v-form>
            <div>
                <v-text-field
                        id="text-field"
                        type="text"
                        label="Input"
                        prepend-icon="fa-mars"
                        outlined
                        v-model="text"
                />
            </div>
            <div>
                <v-btn type="submit" disabled>Submit</v-btn>
            </div>
        </v-form>

    </div>
</template>

<script>
    export default {

        data: () => ({
            text: ''
        }),

        mounted() {
            this.text='TEST'
        }
    }
</script>