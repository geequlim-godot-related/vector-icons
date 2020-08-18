var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { tool } from "./decorators";
const script = godot.load("res://addons/vector-icons/VectorIcon.jsx");
const CLASS_NAME = "VectorIcon";
var MenuItems;
(function (MenuItems) {
    MenuItems["BROWSE_ICONS"] = "Browse Vector Icons";
})(MenuItems || (MenuItems = {}));
let VectorIconPlugin = class VectorIconPlugin extends godot.EditorPlugin {
    _enter_tree() {
        this.add_custom_type(CLASS_NAME, "Control", script, null);
    }
    _exit_tree() {
        this.remove_custom_type(CLASS_NAME);
    }
    _ready() {
        this.add_tool_menu_item(MenuItems.BROWSE_ICONS, this, "_on_menu_pressed", MenuItems.BROWSE_ICONS);
    }
    _on_menu_pressed(action) {
        switch (action) {
            case MenuItems.BROWSE_ICONS:
                godot.OS.shell_open("https://oblador.github.io/react-native-vector-icons");
                break;
        }
    }
};
VectorIconPlugin = __decorate([
    tool
], VectorIconPlugin);
export default VectorIconPlugin;
//# sourceMappingURL=plugin.jsx.map