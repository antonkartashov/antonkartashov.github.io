String.prototype.upperCase = ->
  @charAt(0).toUpperCase() + @slice(1)

handle = (Utils.domLoadJSONSync "https://randomuser.me/api/?gender=male&results=27").results

for item, i in handle
	avatar = item.picture.medium
	first =  item.name.first.upperCase()
	last =   item.name.last.upperCase()

	bg = new Layer
		image: Utils.randomImage()
		backgroundColor: Utils.randomColor()
		width: 750, height: 300
		opacity: .5
		y: i * 300

	user = new Layer
		image: item.picture.medium

		width: 180, height: 180
		x: Align.center
		y: i * 300
		borderRadius: "50%"
		borderWidth: 3
		borderColor: "rgba(255, 255, 255, .9)"

	headline = new Layer
		html: "#{first} #{last}"
		style:
			textAlign: "center"
			fontFamily: "Roboto Mono"
			fontSize: "23pt"
		y: i * 300 + 220
		width: 750
		backgroundColor: ""
