import { DateRange } from './DateRange.component'

class Simple {
    constructor() {
        this.template = `<div></div>`
    }
}

class ComponentFactory {
    static list = {
        DateRange,
        Simple
    }

    create(name = 'Simple', args) {
        const Component = ComponentFactory.list[name] || ComponentFactory.list["Simple"]
        const component = new Component(args)
        return component
    }
}

const factory = new ComponentFactory()

export function compentFactory(name, ...args) {
    return factory.create(name, args)
}