<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                    v-model="date"
                    label="Picker without buttons"
                    prepend-icon="fa-mars"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
            ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu = false" @change="onChange"></v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            menu: false,
        }),
        methods: {
            onChange(e) {
                this.$emit('change', e)
            }
        }
    }
</script>