<template>
    <div class="js-component-wrapper">
        <input dateStart><input dateEnd>
        <div componentsList></div>
    </div>
</template>

<script>
    import {compentFactory} from './componentFactory'

    export default {
        mounted() {
            const contract = compentFactory(
                'Contract',
                $(this.$el.querySelector('[dateStart]')).datepicker(),
                $(this.$el.querySelector('[dateEnd]')).datepicker(),
                {defaultDate: new Date()}
            )
            $(this.$el.querySelector('[componentsList]')).append(contract)
        }
    }
</script>

<style>
    div.js-component-wrapper input {
        border: 1px solid #ccc;
        padding: 3px;
        margin: 3px;
    }
</style>
