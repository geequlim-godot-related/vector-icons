var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, enum_property, tool } from "./decorators";
const IconSets = [
	"AntDesign",
	"Entypo",
	"EvilIcons",
	"Feather",
	"FontAwesome5_Brands",
	"FontAwesome5_Regular",
	"FontAwesome5_Solid",
	"FontAwesome",
	"Fontisto",
	"Foundation",
	"Ionicons",
	"MaterialCommunityIcons",
	"MaterialIcons",
	"Octicons",
	"SimpleLineIcons",
	"Zocial",
];
let VectorIcon = class VectorIcon extends godot.Control {
	constructor() {
		super(...arguments);
		this._font = new godot.DynamicFont();
	}
	get icon_set() { return this._icon_set; }
	set icon_set(v) {
		if (this._icon_set != v) {
			this._icon_set = v;
			this._font.font_data = require(`./Fonts/${v}.ttf`);
			this._icon_sheet = require(`./glyphmaps/${v}`);
			this.update();
		}
	}
	get icon() { return this._icon; }
	set icon(v) {
		this._icon = v;
		if (this._icon_sheet) {
			this._char_code = this._icon_sheet[v];
			this.update();
		}
	}
	get size() { return this._font.size; }
	set size(v) {
		this._font.size = v;
		this.update();
	}
	get color() { return this._color; }
	set color(v) {
		this._color = v;
		this.update();
	}
	get filter() { return this._font.use_filter; }
	set filter(v) {
		this._font.use_filter = v;
		this.update();
	}
	update() {
		this.rect_min_size = this._char_code === undefined ? godot.Vector2.ZERO : this._font.get_char_size(this._char_code);
		super.update();
	}
	_draw() {
		if (this._char_code != undefined && this._font) {
			this.draw_string(this._font, new godot.Vector2(0, this.rect_min_size.y), String.fromCharCode(this._char_code), this.color);
		}
	}
};
__decorate([
	enum_property(IconSets, IconSets[0])
], VectorIcon.prototype, "icon_set", null);
__decorate([
	property('forward')
], VectorIcon.prototype, "icon", null);
__decorate([
	property(16)
], VectorIcon.prototype, "size", null);
__decorate([
	property(godot.Color.white)
], VectorIcon.prototype, "color", null);
__decorate([
	property(true)
], VectorIcon.prototype, "filter", null);
VectorIcon = __decorate([
	tool
], VectorIcon);
export default VectorIcon;
