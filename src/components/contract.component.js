const template = `<input/>`

export function Contract([minDateEl, maxDateEl, options = {}]) {

    const changeRange = function(event) {
        //event.data = 'minDate' or 'maxDate'
        const el = event.data === 'minDate' ? minEl : maxEl
        const el_date = el.datepicker('getDate')
        const otherEl = event.data === 'minDate' ? maxEl : minEl
        const other_date = otherEl.datepicker('getDate')
        _this.datepicker('option', {[event.data]: el_date})

        if (otherEl && ((other_date && other_date.valueOf()) === (el_date && el_date.valueOf()))) {
            // if dateStart === dateEnd
            el.datepicker('setDate', null)
            otherEl.datepicker('setDate', null)
            $(_this).datepicker('option', {minDate: null, maxDate: null})
            setTimeout(() => $(otherEl).datepicker('option', {minDate: null, maxDate: null}))
            setTimeout(() => $(el).datepicker('option', {minDate: null, maxDate: null}))
        } if (!el_date) {
            otherEl.datepicker('option', {[event.data]: null})
        } else {
            otherEl.datepicker('option', {[event.data]: el_date})
        }

        if (_value != (_this.date() && _this.date().valueOf())) _this.trigger('change')

    }

    const _this = $(template).datepicker()

    const minEl = minDateEl && minDateEl.datepicker && minDateEl;
    minEl && minEl.on('change', null, 'minDate', changeRange )

    const maxEl = maxDateEl && maxDateEl.datepicker && maxDateEl;
    maxEl && maxEl.on('change', null, 'maxDate', changeRange )

    let _value = null;

    _this.date = (val) => {
        val && _this.datepicker('setDate', val)
        return _this.datepicker('getDate')
    }

    options.defaultDate && _this.datepicker('setDate', options.defaultDate)
    setTimeout(()=> _this.trigger('change'))

    _this.on('change', () => {
        if (_value === (_this.date() && _this.date().valueOf())) {
            return
        }
        _value = _this.date() && _this.date().valueOf();
        console.log('- new value =', _this.datepicker('getDate'))
    })

    return _this
}

