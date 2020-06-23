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

@tool
export default class VectorIcon extends godot.Control {
	
	protected _font = new godot.DynamicFont();
	protected _icon_sheet: Record<string, number>;
	protected _char_code: number;

	@enum_property(IconSets, IconSets[0])
	public get icon_set() : string { return this._icon_set; }
	public set icon_set(v : string) {
		if (this._icon_set != v) {
			this._icon_set = v;
			this._font.font_data = require(`./Fonts/${v}.ttf`);
			this._icon_sheet = require(`./glyphmaps/${v}`);
			this.update();
		}
	}
	protected _icon_set : string;

	@property('forward')
	public get icon() : string { return this._icon; }
	public set icon(v : string) {
		this._icon = v;
		if (this._icon_sheet) {
			this._char_code = this._icon_sheet[v];
			this.update();
		}
	}
	protected _icon : string;
	
	@property(16)
	public get size() : number { return this._font.size; }
	public set size(v : number) {
		this._font.size = v;
		this.update();
	}

	@property(godot.Color.white)
	public get color() : godot.Color { return this._color; }
	public set color(v : godot.Color) {
		this._color = v;
		this.update();
	}
	protected _color : godot.Color;

	@property(true)
	public get filter() : boolean { return this._font.use_filter; }
	public set filter(v : boolean) {
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
}