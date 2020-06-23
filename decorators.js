/** Set the script is runable in editor */
export function tool(target) {
    godot.set_script_tooled(target, true);
}
/** Set the script icon */
export function icon(icon) {
    return function (target) {
        godot.set_script_icon(target, icon);
    };
}
/** Register signal to godot script */
export function signal(name) {
    return function (target) {
        godot.register_signal(target, name);
    };
}
/**
 * Register multiple signals from an array or keys of an object
 * @param signals The object or array contains signal names
 */
export function signals(signals) {
    return function (target) {
        let keys = [];
        if (!Array.isArray) {
            keys = Object.getOwnPropertyNames(signals);
        }
        for (const signal of keys) {
            godot.register_signal(target, signal);
        }
    };
}
/**
 * Register property to godot class
 * @param value The default value of the property
 */
export function property(value) {
    return function (target, property, descriptor) {
        godot.register_property(target, property, value);
        return descriptor;
    };
}
/**
 * Register an enumeration property
 * @param enumeration Enumeration name list
 * @param default_value The default value of the property
 */
export function enum_property(enumeration, default_value) {
    return function (target, property, descriptor) {
        const pi = {
            hint: godot.PropertyHint.PROPERTY_HINT_ENUM,
            type: typeof (default_value) === 'string' ? godot.TYPE_STRING : godot.TYPE_INT,
            hint_string: '',
            default: typeof (default_value) === 'string' ? default_value : 0
        };
        for (let i = 0; i < enumeration.length; i++) {
            pi.hint_string += enumeration[i];
            if (i < enumeration.length - 1) {
                pi.hint_string += ',';
            }
        }
        godot.register_property(target, property, pi);
        return descriptor;
    };
}
/**
 * Return the node with `path` if the `_onready` is called
 * @param path The path or the type to get the node
 */
export function onready(path) {
    return function (target, property, descriptor) {
        descriptor.get = function () {
            const key = `__on_ready_value:${property}`;
            if (!this[key]) {
                this[key] = this.get_node(path);
            }
            return this[key];
        };
        return descriptor;
    };
}
