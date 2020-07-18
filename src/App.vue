<template>
    <v-app light>
        <br>
        <div><img src="images/logo.svg" width="200"/></div>
        <br>

        <div>
            <v-badge
                    bordered
                    color="error"
                    icon="fa-lock"
                    overlap
            >
                <v-avatar color="indigo">
                    <img
                            src="images/vuetify-logo-light.png"
                            alt="Vuetify"
                    >
                </v-avatar>
            </v-badge>
        </div>
        <br>
        <section>
            <date-selector @change="onDateSelectorChange"></date-selector>
        </section>
        <br>
        <section>
            <data-form/>
        </section>

        <section>
            <js-components/>
        </section>

        <br>
        <div>RECENT POSTS</div>
        <div></div>
        <br>

    </v-app>
</template>

<script>
    import DataForm from './components/DataForm.vue'
    import DateSelector from './components/DateSelector.vue'
    import JsComponents from './components/JSComponents.vue'

    export default {
        name: 'App',
        components: {
            DataForm,
            DateSelector,
            JsComponents
        },
        methods: {
            onDateSelectorChange: (e) => {
                console.log('onDateSelectorChange')
                $store.dispatch({ type: 'INCREMENT' })
            }
        }
    }
</script>
