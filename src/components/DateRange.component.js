const template = `<input/>`

export function DateRange([minDateEl, maxDateEl, options = {}]) {

    const setFilter = (part) => {
        /*
         const filters = Object.entries({...filter, ...part})
         filter = filters.reduce((acc, [key, value]) => (!value ? acc : {...acc, [key]: value}), {})
         _this.trigger('changeRange', filter)
         */
        _this.trigger('changeRange', {...filter, ...part})
    }

    const changeRange = function(event) {
        //event.data = 'minDate' or 'maxDate'
        const el = event.data === 'minDate' ? minEl : maxEl
        const el_date = el.datepicker('getDate')
        const otherEl = event.data === 'minDate' ? maxEl : minEl
        const other_date = otherEl.datepicker('getDate')
        _this.datepicker('option', {[event.data]: el_date})


        if (otherEl && ((other_date && other_date.valueOf()) === (el_date && el_date.valueOf()))) {
            // if dateStart === dateEnd
            _this.datepicker('setDate', el_date)
            el.datepicker('setDate', null)
            otherEl.datepicker('setDate', null)
            $(_this).datepicker('option', {minDate: null, maxDate: null})
            setTimeout(() => $(otherEl).datepicker('option', {minDate: null, maxDate: null}))
            setTimeout(() => $(el).datepicker('option', {minDate: null, maxDate: null}))
            setFilter({
                [minDateName]: el_date.valueOf(),
                [maxDateName]: el_date.valueOf(),
            })
            return
        }

        otherEl.datepicker('option', {[event.data]: el_date})
        _this.datepicker('setDate', null)

        setFilter({
            [minDateName]: minEl.datepicker('getDate') && minEl.datepicker('getDate').valueOf(),
            [maxDateName]: maxEl.datepicker('getDate') && maxEl.datepicker('getDate').valueOf(),
        })
    }

    const changeDate = function() {
        _value = _this.date() && _this.date().valueOf();
        setFilter({[minDateName]: _value, [maxDateName]: _value})
    }

    let filter = {}
    const minDateName = options.minDateName || 'minDate'
    const maxDateName = options.maxDateName || 'maxDate'

    let _value = null;

    const _this = $(template).datepicker()
    _this.off().on('change', changeDate)
    _this.date = (val) => {
        val && _this.datepicker('setDate', val)
        return _this.datepicker('getDate')
    }
    options.defaultDate && _this.datepicker('setDate', options.defaultDate)
    setTimeout(()=> _this.trigger('change'))

    const minEl = minDateEl
        && minDateEl.datepicker
        && minDateEl.off('change').on('change', null, 'minDate', changeRange )

    const maxEl = maxDateEl
        && maxDateEl.datepicker
        && maxDateEl.off('change').on('change', null, 'maxDate', changeRange )

    return _this
}

