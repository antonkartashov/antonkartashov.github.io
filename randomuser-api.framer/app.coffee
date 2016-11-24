String.prototype.upperCase = ->
  @charAt(0).toUpperCase() + @slice(1)

handle = (Utils.domLoadJSONSync "https://randomuser.me/api/?gender=male&results=27").results

for item, i in handle
	avatar = item.picture.medium
	first =  item.name.first.upperCase()
	last =   item.name.last.upperCase()
	
	bg = new Layer
		image: Utils.randomImage()
		backgroundColor: "aquamarine"
		
		width: 750, height: 296
		opacity: .5
		y: i * 300
	
	user = new Layer
		image: item.picture.medium
		
		width: 250, height: 250
		x: Align.center
		y: i * 300
		scale: .6
		
		borderRadius: "50%"
		borderWidth: 4
		borderColor: "rgba(255, 255, 255, .5)"
		
	headline = new Layer
		html: "#{first} #{last}"
		style: 
			textAlign: "center"
			fontFamily: "SF UI Display"
			fontSize: "23pt"
			
		y: i * 300 + 220
		width: 750
		backgroundColor: ""
		