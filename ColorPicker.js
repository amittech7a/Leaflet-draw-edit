L.ColorPicker = LeafletToolbar.ToolbarAction.extend({
	options: {
		toolbarIcon: { className: 'leaflet-color-swatch' }
	},

	initialize: function(map, shape, options) {
		this._shape = shape;
		this._map = map;
		L.setOptions(this, options);
		LeafletToolbar.ToolbarAction.prototype.initialize.call(this, map, options);
	},

	addHooks: function() {
		if(this._shape._icon){
			var MyCustomMarker = L.Icon.extend({
				options: {					
					iconUrl: this.options.markerIcon//'images/marker-icon-2x.png'
				}
			});
			this._shape.setIcon(new MyCustomMarker());
		}
		else{
			this._shape.setStyle({ color: this.options.color });
		}
		this.disable();
	},

	_createIcon: function(toolbar, container, args) {
		var colorSwatch = L.DomUtil.create('div'),
			width, height;

		LeafletToolbar.ToolbarAction.prototype._createIcon.call(this, toolbar, container, args);
		
		L.extend(colorSwatch.style, {
			//backgroundColor: this.options.color,
			width: L.DomUtil.getStyle(this._link, 'width'),
			height: L.DomUtil.getStyle(this._link, 'height'),
			border: '3px solid ' + L.DomUtil.getStyle(this._link, 'backgroundColor')
		});
		
		if(this.options.html){
			this._link.innerHTML = this.options.html;
		}
		else{
			L.extend(colorSwatch.style, {
			backgroundColor: this.options.color
			
			});
		}		
		
		this._link.appendChild(colorSwatch);	
				

		L.DomEvent.on(this._link, 'click', function() {
			this._map.removeLayer(this.toolbar.parentToolbar);
		}, this);
	}
});