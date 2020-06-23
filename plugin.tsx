import { tool } from "./decorators";
const script = godot.load("res://addons/vector-icons/VectorIcon.jsx") as godot.ECMAScript;
const CLASS_NAME = "VectorIcon";

enum MenuItems {
	BROWSE_ICONS = "Browse Vector Icons"
}

@tool
export default class VectorIconPlugin extends godot.EditorPlugin {
	_enter_tree() {
		this.add_custom_type(CLASS_NAME, "Control", script, null);
	}

	_exit_tree() {
		this.remove_custom_type(CLASS_NAME);
	}
	
	_ready() {
		this.add_tool_menu_item(MenuItems.BROWSE_ICONS, this, "_on_menu_pressed", MenuItems.BROWSE_ICONS);
	}

	_on_menu_pressed(action: string) {
		switch(action) {
			case MenuItems.BROWSE_ICONS:
				godot.OS.shell_open("https://oblador.github.io/react-native-vector-icons");
				break;
		}
	}
}