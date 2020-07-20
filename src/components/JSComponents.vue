<template>
    <div class="js-component-wrapper">
        <input dateStart />
        <input dateEnd />
        <select typeSelector>
            <option value="documentDate">By Document Date</option>
            <option value="transactionDate">By Transaction Date</option>
        </select>
        <div componentsList></div>
    </div>
</template>

<script>
    import {compentFactory} from './componentFactory'

    export default {
        mounted() {
            let range;
            $(this.$el.querySelector('[typeSelector]')).on('change', (e) => {
                range && range.remove()
                range = compentFactory(
                    'DateRange',
                    $(this.$el.querySelector('[dateStart]'))
                        .datepicker()
                        .datepicker('option', {minDate: null, maxDate: null})
                        .datepicker('setDate', null),
                    $(this.$el.querySelector('[dateEnd]'))
                        .datepicker()
                        .datepicker('option', {minDate: null, maxDate: null})
                        .datepicker('setDate', null),
                    {
                        defaultDate: e.target.value === 'documentDate' ? new Date() : null,
                        minDateName: e.target.value + 'Start',
                        maxDateName: e.target.value + 'End',
                    }
                )
                range.on('changeRange', (e, data) => {
                    console.log(data)
                })
                $(this.$el.querySelector('[componentsList]')).append(range)
            }).trigger('change')
        }
    }
</script>

<style>
    div.js-component-wrapper input, div.js-component-wrapper select {
        border: 1px solid #ccc;
        padding: 3px;
        margin: 3px;
    }
</style>
