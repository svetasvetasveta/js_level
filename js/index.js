document.routePoints = [
    [ 50, 50 ], [ 200, 130 ], [ 400, 230 ], [ 100, 320 ]
]

var Personage = function ( params ) {
    this.element = document.createElement ( 'img' )
    this.element.src = !params || !params.imgURL ?
                  this.defaultPersonageImage : params.imgURL
    document.body.appendChild ( this.element )
    this.elementStyling ( this.element, this.personageStyle )

    this.pointImage = !params || !params.pointImage
                        ? this.defaultPointImage
                        : params.pointImage
    this.route =  !params || !params.routePoints ||
    						  !Array.isArray ( params.routePoints ) ?
                  this.defaultRoute : params.routePoints
    this.setRoutePoints ()
    this.nextPoint = 1
    this.currentPosition = this.route [0]
    this.velocity = !params || !params.velocity
                            || typeof params.velocity !== "number"
                            ? 5 : params.velocity
    this.delay = !params || !params.timeInterval
                         || typeof params.timeInterval !== "number"
                         ? 100 : params.timeInterval
    this.interval = setInterval ( this.mc_personage.bind ( this ), this.delay )
}

Personage.prototype.setRoutePoints = function () {
    for ( var item of this.route ) {
    		if ( !Array.isArray ( item ) ||
        			typeof item [0] !== 'number' ||
              typeof item [1] !== 'number'
        ) continue
        var point = document.createElement ( 'figure' )
        this.elementStyling ( point,
                Object.assign ( this.pointStyle, {
                    left: item [0] + 'px',
                    top:  item [1] + 'px',
                    backgroundImage: "url(" + this.pointImage + ")"
                } )
        )
        document.body.appendChild ( point )
    }
}

Personage.prototype.elementStyling = function ( elem, styleObject ) {
    for ( var s of Object.keys ( styleObject ) ) {
        elem.style [s] = styleObject [s]
    }
}

Personage.prototype.getNextPointIndex = function () {
    this.nextPoint = this.nextPoint < this.route.length - 1 ?
                      this.nextPoint + 1 : 0
}
Personage.prototype.getNextPoint = function ( ind ) {
    return this.route [ this.nextPoint ][ind]
}
Personage.prototype.getDistance = function ( ind ) {
    return this.getNextPoint ( ind ) -
            this.currentPosition [ind]
}

Personage.prototype.mc_personage = function ( event ) {
        var distance = []
        distance [0] = this.getDistance ( 0 )
        distance [1] = this.getDistance ( 1 )
      // достигли очередной точки маршрута

      this.element.style.transform = distance [0] < 0 ?
                    "rotateY(180deg)" : "rotateY(0deg)"
      this.currentPosition [0] += distance [0] !== 0 ?
              Math.sign(distance [0]) * this.velocity : 0
      this.currentPosition[1] += distance [1] !== 0 ?
              Math.sign(distance [1]) * this.velocity : 0
      this.element.style.left = this.currentPosition [0] + 'px'
      this.element.style.top = this.currentPosition [1] + 'px'
      if ( distance [0] === 0 && distance [1] === 0 )
                            this.getNextPointIndex ()
}

Personage.prototype.defaultRoute = [
		[ 50, 50 ], [ 300, 300 ], [ 100, 300 ], [ 200, 50 ]
]
Personage.prototype.defaultPersonageImage = "./images/personage.gif"
Personage.prototype.defaultPointImage = "./images/tree.gif"

Personage.prototype.personageStyle = {
		position: "fixed",
    top: 0,
    left: 0,
    width: "50px",
    height: "auto"
}
Personage.prototype.pointStyle = {
		position: "fixed",
    top: 0,
    left: 0,
    width: "80px",
    height: "80px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundImage: "url(" + this.defaultPointImage + ")"
}

document.personage = new Personage ( {
      routePoints: document.routePoints
})
console.log ( document.personage )
console.log ( '__proto__', document.personage.__proto__ )
