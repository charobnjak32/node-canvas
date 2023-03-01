const gi = require('node-gtk')
const Canvas = require('..')
const clock = require('./clock')

const Gtk = gi.require('Gtk', '3.0')
const Cairo = gi.require('cairo')

gi.startLoop()
Gtk.init()

const window = new Gtk.Window({
	type: Gtk.WindowType.TOPLEVEL
})
const drawingArea = new Gtk.DrawingArea()

const canvas = Canvas.createCanvas(320, 320)
const ctx = canvas.getContext('2d')

drawingArea.on('draw', (cairoContext) => {
	ctx.setCairoContext(cairoContext)
	clock(ctx)
	return true
})

window.add(drawingArea)
window.setDefaultSize(320, 320)
window.showAll()

// window after-close event
window.on('destroy', () => {
	Gtk.mainQuit()
	clearInterval(updateInterval)
})
window.on('delete-event', () => false)

const updateInterval = setInterval(() => {
	drawingArea.queueDraw()
}, 1000)

window.showAll()
Gtk.main()